
### This repository is just for testing perpose



---

# node-js-sample

A sample wallet storage Node.js app using [Express 4](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/amitrana4/sample_wallet.git # or clone your own fork
cd sampleWallet
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).


## Running test cases

Sample file is in test Project
npm test will pick the create a wallet and perform CRU operations

```sh
npm test
```

## Documentation

Four api's are there

- POST wallet
http://localhost:3000/setup
Body: {"description":"test", "amount": 10, "welletId": 123}

- POST update wallet
http://localhost:3000/transact/123
{"description":"test", "balance": 10}

- GET  Wallet All
http://localhost:3000/transactions

GET- By Id
http://localhost:3000/wallet