const Market = artifacts.require("./Market.sol");
const Vault = artifacts.require("./Vault.sol");

contract('Market', (accounts) => {
    let owner = accounts[0];
    let seller = accounts[1];
    let buyer = accounts[2];
    let stockist = accounts[3];
    let market;

    beforeEach(async () => {
        market = await Market.new({from:owner}); 
      });

      it("should allow to buy a product", async () => {
        const tagId = 5289;
        const price = 1000;
        const _hash = await market.toHash(tagId);
        const sig = await web3.eth.sign(seller, _hash);

        const result = await market.buyProduct(sig, tagId, seller, stockist, { value:price, from: buyer});

        const _price = result.logs[0].args._price; 
        const stockistShare = result.logs[0].args._stockistShare;
        const sellerShare = result.logs[0].args._sellerShare;
        
        assert.equal(_price.toNumber(), price);
        assert.equal(stockistShare.toNumber(), price * 0.1);
        assert.equal(sellerShare.toNumber(), price * 0.9);
      });

      it("should allow to seller and stockist to withdraw their deposits", async () => {
        const tagId_a = 5289;
        const price = 1000;
        let _hash = await market.toHash(tagId_a);
        let sig = await web3.eth.sign(seller, _hash);

        let result = await market.buyProduct(sig, tagId_a, seller, stockist, { value:price, from: buyer});
        let sellerShare = result.logs[0].args._sellerShare.toNumber();
        let stockistShare = result.logs[0].args._stockistShare.toNumber();

        const tagId_b = 32283459;
        _hash = await market.toHash(tagId_b);
        sig = await web3.eth.sign(seller, _hash);
        result = await market.buyProduct(sig, tagId_b, seller, stockist, { value:price, from: buyer});
        sellerShare = sellerShare + result.logs[0].args._sellerShare.toNumber();
        stockistShare = stockistShare + result.logs[0].args._stockistShare.toNumber();

        const vaultAddress = await market.trustedVault.call();
        const vault = await Vault.at(vaultAddress);

        result = await vault.withdraw({from: seller});

        let amountWithdrawn = result.logs[0].args.amount.toNumber();
        assert.equal(amountWithdrawn, sellerShare);

        result = await vault.withdraw({from: stockist});

        amountWithdrawn = result.logs[0].args.amount.toNumber();
        assert.equal(amountWithdrawn, stockistShare);        

      });      

})

