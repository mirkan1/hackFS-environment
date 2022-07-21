// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.7;

// import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WarGame is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId = 8166;

    // Rinkeby coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;
    
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords =  2;
    
    uint256 private s_requestId;
    address s_owner;

    constructor() VRFConsumerBaseV2(vrfCoordinator) { // uint64 subscriptionId
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_owner = msg.sender;
        // s_subscriptionId = subscriptionId; // hardcoded
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() private {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }
    
    function fulfillRandomWords(
        uint256 requestId, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        uint256 id = waitingApprovals[requestId];
        games[id].playerCard = randomWords[0] % totalUniqueCards;
        games[id].houseCard = randomWords[1] % totalUniqueCards;
        delete waitingApprovals[requestId];
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }

    using Strings for uint256;
    string[52] public cards = [
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
        "S-A", "H-A", "C-A", "D-A"
    ];
    uint8 totalUniqueCards = 52;
    
    struct game {
        uint id;
        uint playerCard;
        uint houseCard;
        address player;
    }
    game[] public games;
    uint256 public gameCounter;
    mapping (address => uint256[]) private prevIds;
    mapping (uint256 => uint256) public waitingApprovals;
    uint256 public constant CHIP = 55;
    
    // XXX  //
    // CHIP //
    // XXX  //

    // Function adding values to the mapping
    function play(uint256 amount) public payable {
        uint256 _bal = card3BalanceOf(msg.sender, CHIP);
        require(_bal>=amount, "User does not have enough CHIP funds");
        // need to whitelist me first or I need to override me as whitelist member?/?/?
        // _safeTransferFrom(msg.sender,
        // address to,
        // uint256 id,
        // uint256 amount,
        // bytes memory data)
        // requestRandomWords();
        // waitingApprovals[s_requestId] = gameCounter;
        // games.push(game({
        //     id:gameCounter,
        //     playerCard:0,
        //     houseCard:0,
        //     player: msg.sender
        // }));
        // prevIds[msg.sender].push(gameCounter);
        // gameCounter++;
    }

    function gamesLength() view public returns (uint256) {
        return games.length;
    }

    function getPreviousGameIds(address player) view public returns (uint256[] memory) {
        // gives players all games
        return prevIds[player];
    }

    function getGameHistory(uint id) view public returns (uint, uint, uint, address) {
        game memory result =  games[id];
        return (result.id, result.playerCard, result.houseCard, result.player);
    }   
    address card3StorageAddress;

    function setCard3StorageAddress(address newAddr) payable public onlyOwner {
        card3StorageAddress = newAddr;
    }

    function card3BalanceOf(address account, uint id) view public returns (uint256) {
        // get balance of given id's card3Storage
        return Card3Storage(card3StorageAddress).balanceOf(account, id);
    }

    function _mintBehalf(address to, uint256 id, uint256 amount) public payable {
        Card3Storage(card3StorageAddress).mintBehalf(to, id, amount);
    }

    function _safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public payable {
        Card3Storage(card3StorageAddress).safeTransferFrom(
            from,
            to,
            id,
            amount,
            data
        );
    }
}

interface Card3Storage {
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function mintBehalf(address to, uint256 id, uint256 amount) external payable;
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external payable;
}