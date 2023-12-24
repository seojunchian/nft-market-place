// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract NFTEventsandErrors {
  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
  event Approve(address indexed owner, address indexed approved, uint256 indexed tokenId);
  error InvalidOwner(address from, uint256 tokenId);
  error InvalidSender(address from);
  error InvalidReceiver(address to);
}