import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
    } catch (error) {
      console.log(error);
    }
  } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
  }
});

const ABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "addContest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPendingSubmission",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContestIds",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_contestId",
				"type": "uint256"
			},
			{
				"name": "_codeIpfs",
				"type": "string"
			},
			{
				"name": "_problemIndex",
				"type": "uint256"
			}
		],
		"name": "submitEntry",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_submissionId",
				"type": "uint256"
			},
			{
				"name": "isCorrect",
				"type": "bool"
			}
		],
		"name": "verifyResults",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_contestId",
				"type": "uint256"
			},
			{
				"name": "_problemIndex",
				"type": "uint256"
			}
		],
		"name": "getProblemDetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_contestId",
				"type": "uint256"
			},
			{
				"name": "_problemIpfs",
				"type": "string"
			},
			{
				"name": "_testcaseIpfs",
				"type": "string"
			},
			{
				"name": "_hashAnswerIpfs",
				"type": "string"
			}
		],
		"name": "addQuestion",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const address = "0x1b85B171a066A4E364468407D78d52D382ad0e91";

export const myContractInstance = new web3.eth.Contract(ABI, address);
