const ethers = require("ethers");
require("dotenv").config();
const contractBuild = require("./artifacts/contracts/NFT.sol/NFT.json");

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_API_KEY);
const wallet = ethers.Wallet.fromPhrase(process.env.SENDER_MNEMONIC);
const connectedWallet = wallet.connect(provider);
const contract = new ethers.ContractFactory(
  contractBuild.abi,
  contractBuild.bytecode,
  connectedWallet
);

async function main() {
  const account = wallet.address;
  console.log(account);
}

main().catch((error) => {
  console.log(error);
});
