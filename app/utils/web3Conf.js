import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider);
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
		"inputs": [
			{
				"name": "_contestId",
				"type": "uint256"
			}
		],
		"name": "registerUser",
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
			}
		],
		"name": "getResolvedSubmission",
		"outputs": [
			{
				"name": "arrayCount",
				"type": "uint256"
			},
			{
				"name": "piArray",
				"type": "uint256[]"
			},
			{
				"name": "rsArray",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPendingSubmission",
		"outputs": [
			{
				"name": "subId",
				"type": "uint256"
			},
			{
				"name": "codeIpfs",
				"type": "string"
			},
			{
				"name": "testcaseIpfs",
				"type": "string"
			},
			{
				"name": "hashAnswerIpfs",
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
		"constant": true,
		"inputs": [],
		"name": "getOngoingContest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCreatorContestIds",
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
		"constant": true,
		"inputs": [
			{
				"name": "_contestId",
				"type": "uint256"
			}
		],
		"name": "getResolvedCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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
				"name": "_contestName",
				"type": "string"
			}
		],
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
			}
		],
		"name": "getContestDetails",
		"outputs": [
			{
				"name": "contestName",
				"type": "string"
			},
			{
				"name": "registraionCount",
				"type": "uint256"
			},
			{
				"name": "problemCount",
				"type": "uint256"
			},
			{
				"name": "creatorAddress",
				"type": "address"
			},
			{
				"name": "isUserRegistered",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"name": "problemIpfs",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_contestId",
				"type": "uint256"
			}
		],
		"name": "getQuestionCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
];

const address = "0xab7623bfa8f008b4104aef61fe24ad654780de66";

export const DCodeInstance = new web3.eth.Contract(ABI, address);
