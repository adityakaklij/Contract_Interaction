export const contractAddress = "0x0560DFDBf1D66bCCFe985ae41473d5A7B87779c2"
export const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_str",
				"type": "string"
			}
		],
		"name": "createTweet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tweetMapping",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userArr",
		"outputs": [
			{
				"internalType": "address",
				"name": "userAddres",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Rinkeby Contract address.
// Contract:- 

// //SPDX-License-Identifier:MIT

// pragma solidity ^0.8.3;

// contract Twitter{

//     uint public counter;

//     struct User{
//         address userAddres;
//         string str;
//     }
//     mapping(uint => string) public tweetMapping;
//     // mapping(uint => string) public tweetMapping;

//     User[] public userArr;

//     function createTweet(string memory _str) public {
//         userArr.push(User(msg.sender,_str));
//         tweetMapping[counter] = _str;
//         counter+=1;
//     }   
// }
