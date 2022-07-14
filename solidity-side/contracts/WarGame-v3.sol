// SPDX-License-Identifier: MIT
// An example of a consumer contract that relies on a subscription for funding.
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract VRFv2Consumer is VRFConsumerBaseV2 {
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
    uint32 numWords =  1;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address s_owner;

    constructor() VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_owner = msg.sender;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external onlyOwner {
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
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        for (uint i = 0; i < randomWords.length; i++) {
            s_randomWords.push(randomWords[i]);
        }
    }

    function overrideFulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) public payable {
        fulfillRandomWords( requestId, randomWords );

    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }

    function s_randomWordsLength() external view returns(uint) {
        return s_randomWords.length;
    }

    function getRandomInt(uint n) external view returns(uint) {
        return s_randomWords[n];
    }

    function setS_owner(address _owner) external payable {
        s_owner = _owner;
    }

    function getS_owner() external view returns(address) {
        return s_owner;
    }

    function setCoordinator(address _vrfCoordinator) external payable {
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
    }

    function getVrfCoordinator() external view returns(address) {
        return vrfCoordinator;
    }

}

contract WarGame is ERC1155 {
    VRFv2Consumer randomInt;
    uint256 public constant GOLD = 0;
    uint256 public constant THORS_HAMMER = 2;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        // _mint(msg.sender, GOLD, 10**18, "");
        _mint(msg.sender, THORS_HAMMER, 1, "");
        randomInt = new VRFv2Consumer();
        //address vrfCoordinator = randomInt.getVrfCoordinator();
        //randomInt.setCoordinator(vrfCoordinator);        
        //randomInt.setS_owner(msg.sender);
    }

    // the rest is game
    using Strings for uint256;
    string[52] cards = [
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

    // todo 
    // shuffle deck before game start
    // function suffleDeck(){}
    function getNthCard(uint8 n) external view returns (string memory) {
        require(randomInt.s_randomWordsLength() > n, "card does not exists or transaction still pending");
        uint theInt = randomInt.getRandomInt(n);
        return cards[ theInt % 52 ];
    }

    function howManyRandomWords() external view returns (uint) {
        return randomInt.s_randomWordsLength();
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal {
        randomInt.overrideFulfillRandomWords(requestId, randomWords);
    }

    function requestRandomWords() external {
        randomInt.requestRandomWords();
    }

    modifier onlyOwner() {
        require(msg.sender == randomInt.getS_owner());
        _;
    }

    function mint() external payable {
        randomInt.requestRandomWords();
    }

}