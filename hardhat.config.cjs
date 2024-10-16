require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: ["b188b20ea8abe367efb56e37c1b7ba0f9af659f4ff41cd611705f6ac3bfcb505"]
    }
  }
};
