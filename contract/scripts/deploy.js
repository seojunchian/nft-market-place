const ethers = require("ethers");
require("dotenv").config();

const provider = ethers.JsonRpcProvider(process.env.SEPOLIA_API_KEY);
const wallet = ethers.Wallet.fromPhrase(process.env.SENDER_MNEMONIC);
const connect = wallet.connect(provider);

async function main() {
  const deployed = contract.deploy();
}

main().catch((error) => {
  console.log(error);
});
