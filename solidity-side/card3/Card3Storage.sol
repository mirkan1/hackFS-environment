// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.15;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Card3Storage is ERC1155, Ownable, Pausable {
    uint256 public constant GOLD = 0;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public totalSupply = 5400;
    string[54] cards = [
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
    uint256[] public cardQuantity;
    uint256[] public cardsIds;

    constructor() ERC1155("") {
        for (uint i=0;i<cards.length;i++){
            cardsIds.push(i);
            cardQuantity.push(1);
        }
        _mintBatch(msg.sender, cardsIds, cardQuantity, bytes("Bu contract Fatma icin!"));
    }

    function mint(uint id, uint amount) external payable whenNotPaused {
        _mint(msg.sender, id, amount, "");
        cardQuantity[id]++;
    }

    function mintBehalf(address to, uint id, uint amount) external payable whenNotPaused {
        _mint(to, id, amount, "");
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(
            string(abi.encodePacked(
                "https://gateway.pinata.cloud/ipfs/QmUDdbnhnbYp1ycNg2skWGFZvMbYsCdQNQ1pe36MULWfXu/",
                Strings.toString(tokenId),
                ".json"
            ))
        );
    }

}

