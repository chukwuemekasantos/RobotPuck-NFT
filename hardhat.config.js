require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby : {
      url : process.env.REACT_APP_RINKEBY,
      accounts : [process.env.REACT_APP_WALLET_PRIVATE_KEY]
    }
  },
  etherscan : {
    apiKey :  process.env.REACT_APP_ETHERCAN_KEY
  }
};
