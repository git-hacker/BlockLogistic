const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "orderId",
				"type": "uint256"
			}
		],
		"name": "onConfirmOrder",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_orderId",
				"type": "uint256"
			}
		],
		"name": "confirm",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "eth",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "custumerIdCard",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "custumerAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "driverIdCard",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "driverAddr",
				"type": "address"
			}
		],
		"name": "onCreateOrder",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "idCard",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "scoreCredit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "userType",
				"type": "uint256"
			}
		],
		"name": "onSign",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_distance",
				"type": "uint256"
			},
			{
				"name": "_idCard",
				"type": "uint256"
			},
			{
				"name": "_driverIdCard",
				"type": "uint256"
			},
			{
				"name": "_goods",
				"type": "string"
			},
			{
				"name": "_estimatePrice",
				"type": "uint256"
			}
		],
		"name": "corePay",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "put",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "idCard",
				"type": "uint256"
			},
			{
				"name": "userType",
				"type": "uint256"
			}
		],
		"name": "sign",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "eth",
				"type": "uint256"
			},
			{
				"name": "custumerIdCard",
				"type": "uint256"
			},
			{
				"name": "custumerAddr",
				"type": "address"
			},
			{
				"name": "driverIdCard",
				"type": "uint256"
			},
			{
				"name": "driverAddr",
				"type": "address"
			},
			{
				"name": "distance",
				"type": "uint256"
			},
			{
				"name": "goods",
				"type": "string"
			},
			{
				"name": "extra",
				"type": "string"
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "participantFees",
		"outputs": [
			{
				"name": "etcFee",
				"type": "uint256"
			},
			{
				"name": "driverFee",
				"type": "uint256"
			},
			{
				"name": "insuranceFee",
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "idCard",
				"type": "uint256"
			},
			{
				"name": "scoreCredit",
				"type": "uint256"
			},
			{
				"name": "userType",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports = ABI;