// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract NFTEventsandErrors {
  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
  event Approve(address to, uint256 tokenId);
  error InvalidOwner(address owner);
  error InvalidReceiver(address to);
  error IncorrectOwner(address from, uint256 tokenId, address owner);
}