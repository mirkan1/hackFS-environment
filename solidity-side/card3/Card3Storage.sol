// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.7;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Card3Storage is ERC1155, Ownable, Pausable {
    uint256 public cardsTotalSupply = 5400;
    string[54] public cards = [
        "S-2", "H-2", "C-2", "D-2",
        "S-3", "H-3", "C-3", "D-3",
        "S-4", "H-4", "C-4", "D-4",
        "S-5", "H-5", "C-5", "D-5",
        "S-6", "H-6", "C-6", "D-6",
        "S-7", "H-7", "C-7", "D-7",
        "S-8", "H-8", "C-8", "D-8",
        "S-9", "H-9", "C-9", "D-9",
        "S-10", "H-10", "C-10", "D-10",
        "S-J", "H-J", "C-J", "D-J",
        "S-Q", "H-Q", "C-Q", "D-Q",
        "S-K", "H-K", "C-K", "D-K",
        "S-A", "H-A", "C-A", "D-A", 
            "JOKER1", "JOKER2"
    ];
    uint256 public constant cardBack = 54;
    uint256 public constant CHIP = 55;
    uint256[] public cardQuantity;
    uint256[] internal cardsIds;
    mapping(address => bool) public whitelistedAddresses;
    bool public whiteListOver;
    string private __uri;

    constructor() ERC1155("") {
        for (uint i=0;i<cards.length;i++){
            cardsIds.push(i);
            cardQuantity.push(1);
        }
        _mintBatch(msg.sender, cardsIds, cardQuantity, bytes("Bu contract Fatma icin!"));
        _mint(msg.sender, CHIP, type(uint8).max, "");
        _mint(msg.sender, cardBack, 5, "");
    }

    function whitelistAddreses(address[] calldata addresses, bool isAllow) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelistedAddresses[addresses[i]] = isAllow;
        }
    }

    function userInWhiteList() public view returns (bool){
        return whitelistedAddresses[msg.sender];
    }

    function finishWhiteList(bool _over) public payable onlyOwner {
        whiteListOver=_over;
    }

    function mint(uint id, uint256 amount) external payable whenNotPaused {
        if (id < cardBack) {
            // deck minting
            require(cardQuantity[id] + amount > cardsTotalSupply / cards.length, "Contract reached maximum cardsTotalSupply for given card id");
            if(msg.sender == owner()) {
                _mint(msg.sender, id, amount, "");
            } else if (userInWhiteList() || whiteListOver) {
                require(msg.value >= 5 ether * amount, "1 deck piece is 5 ether");
                _mint(msg.sender, id, amount, "");
                cardQuantity[id]+=amount;
            }
        } else if (id == cardBack) {
            // card-back minting
            require(cardQuantity[id] + amount > cardsTotalSupply / cards.length, "Contract reached maximum cardsTotalSupply for given card id");
            if(msg.sender == owner()) {
              _mint(msg.sender, id, amount, "");  
            } else {
                require(msg.value >= 0.5 ether * amount, "1 card-back is .5 ether");
                _mint(msg.sender, id, amount, "");
            }
        } else if (id == CHIP) {
            if(msg.sender == owner()) {
              _mint(msg.sender, id, amount, "");  
            } else {
                require(msg.value >= 1 ether * amount, "1 chip is 1 ether");
                _mint(msg.sender, id, amount, "");
            }
        } else {
            if(msg.sender == owner()) {
                _mint(msg.sender, id, amount, "");
            }
        }
    }

    function mintBehalf(address to, uint id, uint amount) external payable whenNotPaused onlyOwner {
        if (id < cardBack) {
            // deck minting
            require(cardQuantity[id] + amount > cardsTotalSupply / cards.length, "Contract reached maximum cardsTotalSupply for given card id");
            if(msg.sender == owner()) {
                _mint(to, id, amount, "");
            } else if (userInWhiteList() || whiteListOver) {
                require(msg.value >= 5 ether * amount, "1 deck piece is 5 ether");
                _mint(to, id, amount, "");
                cardQuantity[id]+=amount;
            }
        } else if (id == cardBack) {
            require(cardQuantity[id] + amount > cardsTotalSupply / cards.length, "Contract reached maximum cardsTotalSupply for given card id");
            if(msg.sender == owner()) {
              _mint(to, id, amount, "");  
            } else {
                require(msg.value >= 0.5 ether * amount, "1 card-back is .5 ether");
                _mint(to, id, amount, "");
            }
        } else if (id == CHIP) {
            if(msg.sender == owner()) {
              _mint(to, id, amount, "");  
            } else {
                require(msg.value >= 1 ether * amount, "1 chip is 1 ether");
                _mint(to, id, amount, "");
            }
        } else {
            if(msg.sender == owner()) {
                _mint(to, id, amount, "");
            }
        }
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(
            string(abi.encodePacked(
                __uri,
                Strings.toString(tokenId),
                ".json"
            ))
        );
    }

    function setURI(string memory newuri) public payable onlyOwner {
        __uri = newuri;
    }

}
