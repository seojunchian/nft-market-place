const ethers = require("ethers");
require("dotenv").config();
const contractBuild = require("../artifacts/contracts/NFT.sol/NFT.json");

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_API_KEY);
const signer = new ethers.Wallet(process.env.SENDER_PRIVATE_KEY, provider);
signer.connect(provider);

const factory = new ethers.ContractFactory(
	contractBuild.abi,
	contractBuild.bytecode,
	signer
);

async function main() {
	const deployedContract = factory.deploy();
}

main().catch((error) => {
	console.log(error);
});
