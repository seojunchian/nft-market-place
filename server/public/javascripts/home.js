import {ethers} from "https://cdn.ethers.io/lib/ethers-5.7.esm.min.js";

const contractBuild = await fetch("NFT.json").then((res) => res.json());

const nftBuild = await fetch(
	"https://testnets-api.opensea.io/api/v2/collections/hopefully-will-be-the-last-contract-5-28"
).then((res) => res.json());

const nfts = await fetch(
	"https://testnets-api.opensea.io/api/v2/collection/hopefully-will-be-the-last-contract-5-28/nfts"
).then((res) => res.json());

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = new ethers.Wallet(
	"0x043600a5240985f3f65333c58148ea42919e04ac5ce5a96af1030a4f7b7ae955",
	provider
);
signer.connect(provider);
const contract = new ethers.Contract(
	nftBuild.contracts[0].address,
	contractBuild.abi,
	signer
);

// When page is ready
$(addMainNFT);
$("#header-home-button").click(home);
$("#header-login-button").click(login);
const mainBoxes = document.querySelector(".main-market-boxes");
const yourBoxes = document.querySelector(".main-your-boxes");
const accountAddress = document.getElementById("header-login-texts-address");
const accountBalance = document.getElementById("header-login-texts-balance");

// Home Page
function home() {
	window.location.href = "/";
}

let loginButtonCount = 0;
// Login
async function login() {
	if (window.ethereum) {
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		accountAddress.innerHTML = `Address:${accounts[0]}`;
		const balance = await window.ethereum.request({
			method: "eth_getBalance",
			params: [accounts[0]],
		});
		accountBalance.innerHTML = `Balance:0.${BigInt(balance)}`;
		if (loginButtonCount == 0) {
			addYourNFT();
			loginButtonCount++;
		} else {
			yourBoxes.innerHTML = "";
			addYourNFT();
		}
	} else {
		accountAddress.innerHTML = "Metamask undetetected";
		accountBalance.innerHTML = "";
	}
}

// Show Contract's Nfts
async function addMainNFT() {
	for (let i = 0; i < nfts.nfts.length; i++) {
		const nftOwner = await fetch(
			`https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/0x2f51817c7327f790e8a63d2522713053167d8252/nfts/${i}`
		).then((response) => response.json());
		if (nftOwner.nft.owners[0].address == nftBuild.editors[0]) {
			// Box Div
			let createdDiv = document.createElement("div");
			createdDiv.style.marginRight = "20px";
			mainBoxes.appendChild(createdDiv);

			// Image Div
			let createdImgDiv = document.createElement("div");
			createdImgDiv.style.background = `url("${nftOwner.nft.image_url}")`;
			createdImgDiv.style.width = "225px";
			createdImgDiv.style.height = "150px";
			createdImgDiv.style.backgroundPosition = "center";
			createdImgDiv.style.backgroundSize = "contain";
			createdImgDiv.style.backgroundRepeat = "no-repeat";
			createdDiv.appendChild(createdImgDiv);

			// Properties Div
			let createdPropertiesDiv = document.createElement("div");
			createdPropertiesDiv.style.marginTop = "5px";
			createdDiv.appendChild(createdPropertiesDiv);

			// Properties Name Div
			let createdPropertiesDivName = document.createElement("p");
			createdPropertiesDivName.innerHTML = "Name:" + nftOwner.nft.name;
			createdPropertiesDiv.appendChild(createdPropertiesDivName);

			// Properties Description Div
			let createdPropertiesDivDescription = document.createElement("p");
			createdPropertiesDivDescription.innerHTML =
				"Description:" + nftOwner.nft.description;
			createdPropertiesDiv.appendChild(createdPropertiesDivDescription);

			// Properties Button Div
			let createdPropertiesDivButton = document.createElement("button");
			createdPropertiesDivButton.innerHTML = "Buy";
			createdPropertiesDivButton.style.background = "white";
			createdPropertiesDivButton.style.width = "225px";
			createdPropertiesDivButton.style.height = "25px";
			createdPropertiesDivButton.style.border = "none";
			createdPropertiesDivButton.style.borderRadius = "10px";
			createdPropertiesDivButton.style.cursor = "pointer";
			createdPropertiesDivButton.style.marginTop = "10px";
			createdPropertiesDivButton.style.marginBottom = "20px";
			createdPropertiesDivButton.addEventListener("click", async () => {
				const transferNFTAnswer = confirm("Are you sure?");
				if (transferNFTAnswer == true) {
					if (nftBuild.editors[0] == nftOwner.nft.owners[0]) {
						alert("cant send it to editor");
					} else if (!nftBuild.editors[0]) {
						const accounts = await window.ethereum.request({
							method: "eth_requestAccounts",
						});
						accountAddress.innerHTML = `Address:${accounts[0]}`;
						const balance = await window.ethereum.request({
							method: "eth_getBalance",
							params: [accounts[0]],
						});
						accountBalance.innerHTML = `Balance:0.${BigInt(
							balance
						)}`;
						await contract.transferFrom(
							nftBuild.editors[0],
							accounts[0],
							nftOwner.nft.identifier
						);
					}
				}
			});
			createdPropertiesDiv.appendChild(createdPropertiesDivButton);
		}
	}
}

// Show Account's Nfts
async function addYourNFT() {
	for (let i = 0; i < nfts.nfts.length; i++) {
		const nftOwner = await fetch(
			`https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/0x2f51817c7327f790e8a63d2522713053167d8252/nfts/${i}`
		).then((response) => response.json());
		const accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		if (nftOwner.nft.owners[0].address == accounts[0]) {
			// Box Div
			let createdDiv = document.createElement("div");
			createdDiv.style.marginRight = "20px";
			createdDiv.style.marginBottom = "20px";
			yourBoxes.appendChild(createdDiv);

			// Image Div
			let createdImgDiv = document.createElement("div");
			createdImgDiv.style.background = `url("${nftOwner.nft.image_url}")`;
			createdImgDiv.style.width = "225px";
			createdImgDiv.style.height = "150px";
			createdImgDiv.style.backgroundPosition = "center";
			createdImgDiv.style.backgroundSize = "contain";
			createdImgDiv.style.backgroundRepeat = "no-repeat";
			createdDiv.appendChild(createdImgDiv);

			// Properties Div
			let createdPropertiesDiv = document.createElement("div");
			createdPropertiesDiv.style.marginTop = "5px";
			createdDiv.appendChild(createdPropertiesDiv);

			// Properties Name Div
			let createdPropertiesDivName = document.createElement("p");
			createdPropertiesDivName.innerHTML = "Name:" + nftOwner.nft.name;
			createdPropertiesDiv.appendChild(createdPropertiesDivName);

			// Properties Description Div
			let createdPropertiesDivDescription = document.createElement("p");
			createdPropertiesDivDescription.innerHTML =
				"Description:" + nftOwner.nft.description;
			createdPropertiesDiv.appendChild(createdPropertiesDivDescription);
		}
	}
}
