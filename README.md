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

Execute

`npm run dev` 

and open this url: localhost:8080

Metamask will open and warn that a Dapp is trying to access your accounts. Please click ok.

# Como funciona

Usando Metamask, você consegue interagir com o Dapp a assinar transações. Para recuperar o hash para ser utilizado quando for assinar, capture o hash do Event da transação que estará no log (F12). Para recuperar o resultado da assinatura ao pedir a pizza, recupere do log do console também.

Primeiro, uns dos amigos seleciona o valor a ser gasto e a quantidade de pizzas e faz um hash destes valores. Depois, transfere o valor para o Smart Contract.
Então, usando hash gerado, assine utilizando Metamask.

Com esta assinatura, o outro amigo consegue fazer o pedido da pizza e recuperar o valor que está no smart contract. Para isto, ele precisa pedir o mesmo valor de pizzas e a mesma quantidade e passar o endereço (Address) do amigo que assinou o hash.



# Material de suporte

- [PPT Ethereum bootcamp IFNMG](EthereumbootcampIFNMG.pdf): Slides da apresentação
- [Links úteis](linksUteis.md):  Links de apoio ao conteúdo falado durante o bootcamp
