// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
	constructor() ERC721("Hopefully Will Be The Last Contract 5", "LC") {}
	function mint(address to, uint256 tokenId, string memory _tokenURI) public {
		_mint(to, tokenId);
		_setTokenURI(tokenId, _tokenURI);
	}
}