export const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "Message",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "Todos",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "task",
                "type": "string"
            },
            {
                "internalType": "uint32",
                "name": "timestamp",
                "type": "uint32"
            },
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "group",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isFinished",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isDeleted",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "deadline",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_task",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_group",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_deadline",
                "type": "string"
            }
        ],
        "name": "addTodos",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "getTodos",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "task",
                        "type": "string"
                    },
                    {
                        "internalType": "uint32",
                        "name": "timestamp",
                        "type": "uint32"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "group",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isFinished",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isDeleted",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "deadline",
                        "type": "string"
                    }
                ],
                "internalType": "struct TodoContract.TodoType[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "setIsDeleted",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "setIsFinished",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export const address = '0x2727336ab4e2ee6a199e8a17762b7f6b57d5aba1'