const ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "pool",
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
				"name": "logisticOrderId",
				"type": "uint256"
			},
			{
				"name": "customerAddr",
				"type": "address"
			}
		],
		"name": "core",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "EtcOrders",
		"outputs": [
			{
				"name": "customerAddr",
				"type": "address"
			},
			{
				"name": "eth",
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
				"name": "_confirmAddr",
				"type": "address"
			}
		],
		"name": "setConfirmAddr",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "logisticOrderId",
				"type": "uint256"
			}
		],
		"name": "reduce",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "comfirmAddr",
		"outputs": [
			{
				"name": "",
				"type": "address"
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
				"name": "logisticOrderId",
				"type": "uint256"
			}
		],
		"name": "confirm",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "logisticOrderId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "customerAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "eth",
				"type": "uint256"
			}
		],
		"name": "onCreateETCOrder",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "logisticOrderId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "etcAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "eth",
				"type": "uint256"
			}
		],
		"name": "onExcuteETCOnce",
		"type": "event"
	}
];

module.exports = ABI;