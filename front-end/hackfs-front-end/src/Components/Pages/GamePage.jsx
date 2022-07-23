import React, { useEffect } from "react";
import Button, { CircularButton } from "../Components/CommonContainers/Button";

import dealerCard from "../../Assets/Images/DealerCard.svg";
import playerCard from "../../Assets/Images/PlayerCard.svg";
import InfoPill from "../Components/CommonContainers/InfoPill";
import { useSelector, useDispatch } from 'react-redux';
import { setWarGameGameCounter, setLast10WarGame } from '../../web3Reducers';


const GamepPageCurrentCards = () => {
   const totalChipsInAccount = useSelector((state) => state.web3Reducers.totalChipsInAccount);    
   const warGameContract = useSelector((state) => state.web3Reducers.warGameContract);    
   const etherProvider = useSelector((state) => state.web3Reducers.etherProvider);       
   //const dispatch = useDispatch();
   const handleBet = async (amount) => {
      console.log(totalChipsInAccount
         ,warGameContract
         ,etherProvider)
      if (totalChipsInAccount < amount) {
         alert("Not enought CHIP balance, buy some from mint page");
         // returns to chip page? somehow
         // click to mint page button for rediecting to mint page
      }
      var gasPrice = await etherProvider.getGasPrice();
      // ethers.utils.parseEther(ref.current.value.replace(/,/g, "."))
      var playing = await warGameContract.functions.play(amount, {
         //value:formattedValue,
         gasPrice: gasPrice,//ethers.utils.parseUnits('5', 'gwei'), 
         gasLimit: 3000000,
         //gas use 192384
     });                
     console.log("tx is ongoing", playing)
     var explorerUrl = "https://rinkeby.etherscan.io/tx/" + playing.hash
     console.log("explorerUrl", explorerUrl);
      var played = await playing.wait();
      var _result = played.events[0].args;
      console.log("_result:", _result)
      console.log("end of tx",played)            
   }
   return (
      <div className="flex flex-col gap-y-5 items-center">
         <img src={dealerCard} alt="dealerCard" className="h-48" />
         <div className="flex flex-col gap-y-4 items-center justify-betwee">
            <CircularButton btnText="Bet" onClickCallback={() => {handleBet(1)}}/>
            <span className="text-gray-700 font-bold">
               <span className="font-medium text-gray-600">Current Bet :</span>{" "}
               100 CHIPS
            </span>
         </div>
         <img src={playerCard} alt="playerCard" className="h-48" />
      </div>
   );
};

const GamepPageControlPanel = () => {
   const totalChipsInAccount = useSelector((state) => state.web3Reducers.totalChipsInAccount); 
   return (
      <div className="flex items-center p-10  gap-x-10">
         <div>
            <InfoPill infoLable="Balance" infoText={totalChipsInAccount+" CHIPS"} />
         </div>
         <div className="flex justify-center  gap-x-5">
            <CircularButton
               btnText="100"
               xtraCss="h-16 w-16 outline-dashed outline-red-600"
            />
            <CircularButton
               btnText="250"
               xtraCss="h-16 w-16 outline-dashed outline-blue-600"
            />
            <CircularButton
               btnText="500"
               xtraCss="h-16 w-16 outline-dashed outline-green-600"
            />
         </div>
         <div>
            <Button btnText="Reset Bet" />
         </div>
         <div>
            <Button btnText="Replay" isDisabled={true} />
         </div>
      </div>
   );
};
const RecentGames = () => {
   const warGameContract = useSelector((state) => state.web3Reducers.warGameContract); 
   const warGameGameCounter = useSelector((state) => state.web3Reducers.warGameGameCounter); 
   const last10WarGame = useSelector((state) => state.web3Reducers.last10WarGame); 
   const address = useSelector((state) => state.web3Reducers.address); 
   const dispath = useDispatch();
   
   useEffect( () => {
      const fetchData = async (warGameContract) => {
         let totalGamesLength = await warGameContract.functions.gameCounter();
         totalGamesLength = parseInt(totalGamesLength);
         var arr_ = []
         var counter = 0;
         for (let i = totalGamesLength-1;i>0;i--) {
            console.log(i)
            if (counter > 10) {
               console.log("passing game #", i)
               continue
            }
            const game = await warGameContract.functions.getGameHistory(i);
            let gameId = parseInt(game[0].toString()) // : BigNumber {_hex: '0x00', _isBigNumber: true}
            let playerCard = parseInt(game[1].toString()) // : BigNumber {_hex: '0x2d', _isBigNumber: true}
            let houseCard = parseInt(game[2].toString()) // : BigNumber {_hex: '0x27', _isBigNumber: true}
            let playerAddress = game[3].toString() // : "0x8631d67899F62B2784B7c92d143903b3b2fD0B60"
            if (game.playerCard < 1 && game.houseCard < 1 && totalGamesLength == warGameGameCounter+1 ) {
               continue;
            }
            arr_.push({gameId, playerCard, houseCard, playerAddress});
            counter++;
            }
         dispath(setWarGameGameCounter(parseInt(totalGamesLength)));
         dispath(setLast10WarGame(arr_));
         console.log("totalGamesLength", totalGamesLength);
       }
      if (warGameContract) {
         fetchData(warGameContract)
      }
   }, [warGameContract])
   
   return (<div className="flex-col items-center p-2 gap-x-10" style={{
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: "10px"

   }}>
      Total games #{warGameGameCounter} 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      User vs House
      <hr style={{backgroundColor:"black", height:"2px"}}></hr>
      {address ? last10WarGame.map((game, index) => {
         return (
            <div key={index} className="flex flex-col gap-y-2 items-center">
               <span className="text-gray-700 font-bold">
                  <span className="font-medium text-gray-600">Game #{game.gameId} :</span>{" "}
                  <span style={{ color: game.playerCard > game.houseCard ? "red" : ""}}>{game.playerCard}</span> vs&nbsp; 
                  <span style={{ color: game.houseCard > game.playerCard ? "red" : ""}}>{game.houseCard}</span>
               </span>
               <span className="text-gray-700 font-bold">
                  <span className="font-medium text-gray-600" style={{color: address.toLowerCase() == game.playerAddress.toLowerCase() ? "red" : ""}}>Player :</span>{" "}
                  {game.playerAddress}
               </span>
            </div>
         );
      }) : <div>Loading...</div>}
      <br></br>
   </div>);
}
function GamePage() {
   return (
      <div className="flex flex-row">
         <div className="flex-col items-center p-8  gap-x-10">
            <GamepPageCurrentCards />
            <GamepPageControlPanel />
         </div>
         <RecentGames />
      </div>
   );
}

export default GamePage;
