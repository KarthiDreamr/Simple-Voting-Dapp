// truffle-config.js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Ganache GUI default port
      network_id: "*",       // Any network
    },
  },

  // Compiler configuration
  compilers: {
    solc: {
      version: "0.8.0",      // Solidity version
    },
  },
};