import React from "react";
import Button, { CircularButton } from "../Components/CommonContainers/Button";

import dealerCard from "../../Assets/Images/DealerCard.svg";
import playerCard from "../../Assets/Images/PlayerCard.svg";
import InfoPill from "../Components/CommonContainers/InfoPill";

const GamepPageCurrentCards = () => {
   return (
      <div className="flex flex-col gap-y-5 items-center">
         <img src={dealerCard} alt="dealerCard" className="h-48" />
         <div className="flex flex-col gap-y-4 items-center justify-betwee">
            <CircularButton btnText="Bet" />
            <span className="text-gray-700 font-bold">
               <span className="font-medium text-gray-600">Current Bet :</span>{" "}
               100 CHIPS
            </span>
         </div>
         <img src={playerCard} alt="playerCard" className="h-48" />
      </div>
   );
};
const GamepPageDeckOfCards = () => {};
const GamepPageControlPanel = () => {
   return (
      <div className="flex items-center p-10  gap-x-10">
         <div>
            <InfoPill infoLable="Balance" infoText="10000.080870 CHIPS" />
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

function GamePage() {
   return (
      <div className="flex flex-col">
         <GamepPageCurrentCards />
         <GamepPageControlPanel />
      </div>
   );
}

export default GamePage;
