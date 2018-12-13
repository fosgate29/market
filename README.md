## UNICEF Innovation Challenge - Blockchain

# Dependencies
Do you have **nodejs** installed? 

https://nodejs.org/en/download/

You also need **Truffle** - It is a developer tool to work with Ethereum

`npm install -g truffle`

Install **Metamask** - It is a browser plugin Chrome to work with Ethereum wallets

https://metamask.io/

Install **ganache-cli** - Ganache  simulates Ethereum blockchain for tests purposes

`npm install -g ganache-cli`

After environment is setup, clone this repo:
`git clone https://github.com/fosgate29/Signature-Example.git`

Then, open a new terminal and execute `ganache-cli`

After **Ganache** is running, go to **market** folder and execute **npm install** and wait because it may take some time

`npm install`

When it is done, execute `truffle migrate --development --reset` (it will compile and send the compiled smart contract to Ganache instance)

Open your browser that you have **Metamask** working and unlock it. Please get seeds words from Ganache to be able to important the tests accounts to Metamask.

![](ganachessedwords.gif)

Execute

`npm run dev` 

and open this url: localhost:8080

Metamask will open and warn that a Dapp is trying to access your accounts. Please click ok.

# How this demo works

When it opens, you will see a form.

- First step is done by the seller. Now it is done manually, but the final product would do this hash in the backend. So, eEach product that is going to be sold in a stock, will have tag. It can be a QR code or barcode. For this demo, add any number and click **Hash Tag Id**.

- After it is hashed, seller needs to sign it. So, when the product is sold to a buyer, we can guarantee the value that is being paid for that product is sent to the seller. You have to manually copy it and paste it to the input space and click **Sign Data**.

- Now, with the signed hash, copy it and paste in the last form, 



# Video

- [PPT Ethereum bootcamp IFNMG](EthereumbootcampIFNMG.pdf): Slides da apresentação
