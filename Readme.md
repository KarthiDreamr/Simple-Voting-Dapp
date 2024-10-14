# Simple Voting Dapp

A decentralized application (Dapp) for conducting simple, transparent, and secure voting using Ethereum blockchain technology.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Simple Voting Dapp is a decentralized application built on the Ethereum blockchain that allows users to create and participate in transparent and secure voting processes. This project is ideal for learning and understanding how blockchain technology can be used in real-world applications.

## Features
- **Decentralized Voting**: Ensure the integrity and transparency of the voting process by leveraging blockchain technology.
- **Smart Contracts**: Use Solidity smart contracts to manage the voting process.
- **User-Friendly Interface**: Interact with the voting system through a simple and intuitive web interface.

## Technologies Used
- **JavaScript**: For the frontend development.
- **Solidity**: For writing smart contracts.
- **Web3.js**: To interact with the Ethereum blockchain.
- **Node.js**: For backend development and running the development server.
- **Truffle**: For smart contract development, testing, and deployment.
- **Ganache**: For local blockchain development and testing.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)
- [MetaMask](https://metamask.io/) (for interacting with the Dapp)

### Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/KarthiDreamr/Simple-Voting-Dapp.git
    cd Simple-Voting-Dapp
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Compile the smart contracts**:
    ```bash
    truffle compile
    ```

4. **Migrate the smart contracts to the local blockchain**:
    ```bash
    truffle migrate
    ```

5. **Run the development server**:
    ```bash
    npm start
    ```

## Usage
1. **Start Ganache**: Open Ganache and start a new workspace.
2. **Connect MetaMask to Ganache**: Configure MetaMask to use the local blockchain provided by Ganache.
3. **Interact with the Dapp**: Open your browser and navigate to `http://localhost:3000` to interact with the voting Dapp.

## Smart Contract
The main smart contract used in this project is `Voting.sol`. This contract manages the voting process, including:
- Adding candidates
- Voting for candidates
- Retrieving vote counts

## Contributing
Contributions are welcome! If you have any suggestions or improvements, please create a pull request or open an issue.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
