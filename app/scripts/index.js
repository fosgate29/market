// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import marketArtifact from '../../build/contracts/Market.json'

// Market is our usable abstraction, which we'll use through the code below.
const Market = contract(marketArtifact)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account
let signature

const App = {
  start: function () {
    const self = this

    Market.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]
      console.log(account)
      self.checkaccounts()

    })
  },

  checkaccounts: function() {
    var self = this; 
    var accountInterval = setInterval(function() {
      web3.eth.getAccounts(function(err, accs){
        if (err!=null){
          alert("There is an error with your accounts updates.");
          return; 
        }

        if (accs.length == 0) {
          alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        }
        if (accs[0] !== account) {
          account = accs[0];
        }
      }, 100);
    })
},

  setHashStatus: function (message) {
    const status = document.getElementById('hashStatus')
    status.innerHTML = message
  },

  hashIt: function () {
    const self = this; 
    const tagId = parseInt(document.getElementById('_tagId').value);
    this.setHashStatus('Calculating the hash...please wait');
    let market; 
    Market.deployed().then(function (instance){
      market = instance
      return market.toHash(tagId, { from: account })
    }).then(function(res) {
      self.setHashStatus('Result ' + res)
      console.log(res) 
    }).catch(function (e) {
      console.log(e)
      self.setHashStatus('Something went wrong. Open the console.')
    })
  },

  toBytes32: function(i) {
    const stringed = "0000000000000000000000000000000000000000000000000000000000000000" + i.toString(16);
    return "0x" + stringed.substring(stringed.length - 64, stringed.length); 
},

  signIt: function() {
    const self = this;
    const toSign = document.getElementById('toSign').value
    //const forSigning = web3.utils.utf8ToHex(toSign)
    const test = this.toBytes32(toSign)
    console.log(test)
    let result;
    self.setEthStatus("Please wait, signing product tag id.");
    web3.personal.sign(toSign, account, function (error, res) {
      signature = res
      if(!error){
        console.log(JSON.stringify(res));
        self.setEthStatus("Done" + JSON.stringify(res));        
      }
      else
        console.error(error);
    })
    
    //self.setEthStatus(signature);
    console.log(signature);
  },

  setEthStatus: function (message) {
    const status = document.getElementById('ethStatus')
    status.innerHTML = message
  },

  buyProduct: function () {
    const self = this;
    const sentTagId = parseInt(document.getElementById('sentTagId').value)
    const seller = document.getElementById('seller').value
    const stockist = document.getElementById('stockist').value
    const sig = document.getElementById('sig').value
    const productPrice = parseInt(document.getElementById('productPrice').value)
    console.log(sentTagId)
    console.log(seller)
    console.log(stockist)
    console.log(sig)
    console.log(account);
    console.log(productPrice);
    let market 
    this.setEthStatus('Buying a product...please wait')
    Market.deployed().then(function (instance) {
      market = instance
      return market.buyProduct(sig, sentTagId, seller, stockist, { from: account, value: productPrice})
    }).then( function () {
      self.setEthStatus('Product paid.')
    }).catch( function (e) {
      console.log(e)
      self.setEthStatus('Error buying a product...see console log')
    })
  }
}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:9545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  App.start()
})
