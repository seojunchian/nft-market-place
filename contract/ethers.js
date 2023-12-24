const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();
const contractBuild = require("./artifacts/contracts/NFT.sol/NFT.json");

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_API_KEY);
const signer = new ethers.Wallet(process.env.SENDER_PRIVATE_KEY, provider);
signer.connect(provider);
const contract = new ethers.Contract(
	"0xed940595c9cb9fbda48ff9d5eab0b2078ab10a5c",
	contractBuild.abi,
	signer
);

async function main() {
	const jsonDir = fs.readdirSync("../server/public/images/nft");
	for (let i = 0; i < jsonDir.length / 3; i++) {
		const jsonFiles = fs.readFileSync(
			`../server/public/images/nft/#${i}json.json`
		);
		await contract.mint(
			process.env.SENDER_PUBLIC_KEY,
			i,
			`${JSON.parse(jsonFiles).jsonIPFS}`
		);
	}
}

main().catch((error) => {
	console.log(error);
});
