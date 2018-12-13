pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ECRecovery.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./Vault.sol";

contract Market {

    using SafeMath for uint256;
    using ECRecovery for bytes32;

    Vault public trustedVault; 

    event LogProductBought(address _buyer, address _seller, address _stockist, uint256 _tagId, uint256 _price, uint256 _sellerShare, uint256 _stockistShare);

    constructor () public 
    {
        trustedVault = new Vault();
    }

    function buyProduct(
        bytes _signature,
        uint256 _tagId,
        address _seller,
        address _stockist)
        public
        payable
    {
        require(msg.value > 0, "It is not allowed to buy a product paying 0.");

        //Convert to a signed message in Ethereum
        bytes32 temp = keccak256(abi.encodePacked(_tagId));
        bytes32 _hash = temp.toEthSignedMessageHash();
        require(_seller == _hash.recover(_signature), "Seller signature is wrong");

        //sends value to seller
        uint256 sellerShare = msg.value.mul(9);
        sellerShare = sellerShare.div(10);  // 90%

        uint256 stockistShare = msg.value.sub(sellerShare); //stockist share is what remains

        require(sellerShare.add(stockistShare) == msg.value, "Seller share and stockist share is not equal to the value paid."); // make sure math is ok

        trustedVault.deposit.value(sellerShare)(_seller);
        trustedVault.deposit.value(stockistShare)(_stockist);

        emit LogProductBought(msg.sender, _seller, _stockist, _tagId, msg.value, sellerShare, stockistShare);
    }
      
    /**
    * Hash tag id
    */
    function toHash(uint256 _tagId) 
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_tagId));
    }
    
}

