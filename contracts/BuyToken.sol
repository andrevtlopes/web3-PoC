// contracts/MyContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "hardhat/console.sol";

contract BuyToken is Pausable, Ownable, EIP712 {
    using SafeMath for uint256;

    event BuyTokenEvent(uint256 tokenId);

    // one address can recieve only one donation
    // the ones already recieved one, are stored here
    mapping(address => bool) public alreadyBoughtWhitelist;

    address private validator;
    uint256 private limit;
    uint256 public price;

    constructor(
        string memory name,
        string memory version,
        uint256 _limit,
        uint256 _price,
        address _validator
    ) EIP712(name, version) {
        limit = _limit;
        price = _price;
        validator = _validator;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setRaiseLimit(uint256 _limit) public onlyOwner {
        require(_limit > limit, "Limit needs to be greater");
        limit = _limit;
    }

    function setPrice(uint256 _price) public onlyOwner {
        require(_price > 0, "Price needs to be greater than 0");
        price = _price;
    }

    function setRaiseLimitAndPrice(uint256 _limit, uint256 _price)
        public
        onlyOwner
    {
        setPrice(_price);
        setRaiseLimit(_limit);
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function _buyTokens() private {
        uint256 total = 0;
        require(total.add(address(this).balance).add(msg.value) <= limit, "Limit was reached!");
        require(msg.value <= price, "Please, send the right value");

        if (alreadyBoughtWhitelist[msg.sender] == true)
            revert("Address already bought tokens");
            
        alreadyBoughtWhitelist[msg.sender] = true;
    }

    function buyTokensWhitelist(
        bytes memory signature,
        address sender,
        uint256 x,
        uint256 deadline
    ) external payable {
        require(sender == msg.sender, "Whitelist: invalid address");

        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
            keccak256("MyFunction(address sender,uint256 x,uint256 deadline)"),
            sender,
            x,
            deadline
        )));

        address signer = ECDSA.recover(digest, signature);
        require(signer == validator, "Whitelist: invalid signature");
        require(signer != address(0), "ECDSA: invalid signature");

        require(block.timestamp < deadline, "Whitelist: signature expired");

        _buyTokens();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
