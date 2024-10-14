### Step-by-Step Guide: Running and Testing the `Voting.sol` Smart Contract

This documentation provides the steps to set up your local environment and run the `Voting.sol` smart contract, including writing and running tests. Before starting, ensure you have the required prerequisites installed.

---

### Prerequisites

1. **Git**: For cloning the repository.
   - Install Git from the [official site](https://git-scm.com/downloads) if it's not already installed.

2. **Node.js**: JavaScript runtime required to run the tools (Truffle, npm).
   - Download and install Node.js from [here](https://nodejs.org/).

3. **Ganache**: A personal blockchain for Ethereum development, which you'll use to deploy the contract locally.
   - Download the Ganache app from the [Truffle Suite website](https://trufflesuite.com/ganache/).

---

### Step 1: Clone the Project Repository

1. Open a terminal (or Git Bash) and navigate to the folder where you want to clone the project.
   
2. Clone the repository using the command:

   ```bash
   git clone https://github.com/KarthiDreamr/Simple-Voting-Dapp.git
   ```

3. Navigate into the project directory:

   ```bash
   cd Simple-Voting-Dapp
   ```

---

### Step 2: Install Dependencies

1. Install the project dependencies using **npm** (Node Package Manager):

   ```bash
   npm install
   ```

   This will install all the required packages listed in the `package.json` file, including Truffle and OpenZeppelin test helpers.

---

### Step 3: Set Up Truffle

1. **Create a migration script**:

   Truffle uses migration scripts to deploy smart contracts to the blockchain. You'll need to create a migration script to deploy the `Voting.sol` contract.

   ```bash
   truffle create migration deploy_voting
   ```

2. This will create a new migration file in the `migrations/` folder. Open this file and update it as follows:

   ```js
   const Voting = artifacts.require("Voting");

   module.exports = function (deployer) {
     const proposals = ["Fireball", "Invisibility", "Teleportation"];
     deployer.deploy(Voting, proposals);
   };
   ```

   This script tells Truffle to deploy the `Voting` contract with a list of proposals.

---

### Step 4: Compile the Smart Contract

1. Compile the smart contract to generate the necessary artifacts (such as the ABI and bytecode).

   ```bash
   truffle compile
   ```

   This command compiles your smart contracts and checks for any syntax errors. If the compilation is successful, you'll see the artifacts generated in the `build/contracts/` folder.

---

### Step 5: Start Ganache (Local Blockchain)

1. Open the **Ganache** application.
2. Select **Quickstart** to launch a new local blockchain instance.
3. Note the RPC Server URL, which is typically `http://127.0.0.1:7545`.

---

### Step 6: Migrate the Contract to Ganache

1. Deploy the smart contract to the local blockchain (Ganache) by running the migration script.

   ```bash
   truffle migrate --network development
   ```

   This deploys your contract to the blockchain running on Ganache. The `--network development` option ensures Truffle uses the default development configuration (pointing to Ganache).

   **Tip**: Ensure your `truffle-config.js` file has the `development` network configured correctly, something like:

   ```js
   module.exports = {
     networks: {
       development: {
         host: "127.0.0.1",
         port: 7545,
         network_id: "*", // Match any network id
       },
     },
     compilers: {
       solc: {
         version: "^0.8.0", // Specify the Solidity compiler version
       },
     },
   };
   ```

---

### Step 7: Run Tests

1. Once the contract is deployed, run the tests to ensure everything works as expected.

   ```bash
   truffle test
   ```

   This command runs the `test/Voting.test.js` file and outputs the results of each test case.

   If everything is configured correctly, you should see output that confirms whether the tests passed or failed.

---

### Additional Information

- **Test Structure**: The tests in `Voting.test.js` use the `artifacts.require()` method to load the contract and verify behavior using the Truffle testing framework, along with OpenZeppelin’s test helpers.
  
- **Network Configurations**: You can configure different networks in `truffle-config.js` for deploying to other blockchains (such as testnets like Ropsten).

---

### Common Commands Summary

- **Clone Repository**: 
   ```bash
   git clone <repository_url>
   ```

- **Install Dependencies**: 
   ```bash
   npm install
   ```

- **Create Migration**:
   ```bash
   truffle create migration deploy_voting
   ```

- **Compile Contracts**:
   ```bash
   truffle compile
   ```

- **Migrate to Ganache**:
   ```bash
   truffle migrate --network development
   ```

- **Run Tests**:
   ```bash
   truffle test
   ```

---

### Troubleshooting

1. **"No network found" Error**: Ensure Ganache is running and the `truffle-config.js` points to the correct host and port (127.0.0.1:7545).
2. **Compilation Errors**: Verify that your Solidity version in `truffle-config.js` matches the version used in your smart contract (e.g., `pragma solidity ^0.8.0;`).
