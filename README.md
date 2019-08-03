# DCode

Decentralized Competetive Coding platform to organize and participate in problem solving contests over the [Matic](https://matic.network) test network.

## Installation

Requirements:

- Node 8+
- npm
- IPFS
- Metamask Extension

a. Install Packages - ```npm install```  
b. Start IPFS Daemon - ```ipfs daemon```  
c. Start Server - ```npm start``` - Open localhost:3000  
d. Build - ```npm run build```  
e. Configure Metamask to connect to Matic test network - Follow instructions from the [docs](https://docs.matic.network/)

## Technologies

- Web3
- IPFS
- React Redux

## How it works?

Whenever a contest is created by a user, the problem statements, inputs and outputs are pushed into IPFS and along with the
IPFS Hashes and other details of the contest is stored in an Ethereum contract deployed on the Matic network.
Any other user can register for the contest and submit solutions. The contract keeps track of these submissions and assigns
random nodes active in the network to evaluate the submission. To avoid fake nodes, this is done redundantly and atleast m
validations from nodes is required for a single submission to finalize the verdict.

### Why we chose Matic over other test networks?
Unlike a Defi app who's main purpose is transfer of tokens over the Blockchain, DCode is an application and hence required
much faster and cheaper transactions which Matic was able to deliver.

## Contributors

- [Akshay Pai](https://github.com/PaiAkshay998)
- [Sai Hemanth](https://github.com/shb9019)
