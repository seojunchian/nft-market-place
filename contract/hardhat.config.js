require("dotenv").config();

module.exports = {
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_API_KEY,
      accounts: [process.env.SENDER_PRIVATE_KEY],
    },
  },
  solidity: "0.8.19",
};
