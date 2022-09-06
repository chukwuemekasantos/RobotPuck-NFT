// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract RobotPuckNFT is ERC721, Ownable {

    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUrl;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() ERC721("RobotPuckNFT", "RPNFT") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;

    }

    function setisPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUrl(string calldata _baseTokenUrl) external onlyOwner {
        baseTokenUrl = _baseTokenUrl;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory){
        require(_exists(tokenId_), 'Token deos not exists');
        return string(abi.encodePacked(baseTokenUrl,Strings.toString(tokenId_),".josn"));
    }

    function withdraw(address payable _to) public payable onlyOwner {
         (bool success, ) = _to.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }


    function mint(uint256 _quality) public payable{
        require(isPublicMintEnabled, "Minting is not enabled");
        require(msg.value == _quality * mintPrice, "Insuficient price");
        require(totalSupply + _quality <= maxSupply, "sold out");
        require(walletMints[msg.sender] + _quality <= maxSupply, "Exceeds minting amount");
        for(uint256 i = 0; i < _quality; i++){
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
