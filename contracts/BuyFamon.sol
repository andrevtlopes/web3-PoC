// contracts/MyContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BuyFamon is Pausable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    event BuyFamonEvent(uint256 tokenId);

    uint256 private limit;
    uint256 public price;
    uint8 public min;
    uint8 public max;

    constructor(uint256 _limit, uint256 _price) {
        limit = _limit;
        price = _price;
        min = 1;
        max = 10;
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

    function setRaiseLimitAndPrice(uint256 _limit, uint256 _price) public onlyOwner {
        require(_limit > limit, "Limit needs to be greater");
        require(_price > 0, "Price needs to be greater than 0");
        limit = _limit;
        price = _price;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function buyFamon(uint8 _quantity) public payable returns (uint256) {
        require(_quantity <= max, "Buy maximum is 10");
        require(_quantity >= min, "Buy minimum is 1");
        require(_tokenIdCounter.current().add(_quantity) <= limit, "Limit was reached!");
        require(msg.value == price.mul(_quantity), "Please, send the right value");
        uint256 tokenId = _tokenIdCounter.current().add(1);
        for (uint8 i = 0; i < _quantity; i++) {
            _tokenIdCounter.increment();
        }
        emit BuyFamonEvent(tokenId);
        return tokenId;
    }

    function getCounterAndLimit() public view returns (uint256, uint256) {
        return (_tokenIdCounter.current(), limit);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

