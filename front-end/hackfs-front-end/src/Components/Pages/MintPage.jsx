import React from "react";
import heroImage from "../../Assets/Images/HeroImage.png";
import Button from "../Components/CommonContainers/Button";

function MintPage() {
   return (
      <div className="flex gap-x-8">
         <img src={heroImage} alt="hero_image" className="h-96" />
         <div className="flex flex-col text-2xl font-medium gap-y-8 justify-between w-96">
            <p>
               The world’s first decentralized card club where each card dealt
               is an NFT owned by someone. If your card is involved in a winning
               hand, you also win.
            </p>
            <div className="flex flex-col gap-y-4">
               <span className="text-base">
                  How Many Cards would you like to mint ?
               </span>
               <div className="flex gap-x-2 items-center">
                  <input className="w-32 h-10 rounded " />
                  <span className="text-gray-500 text-sm">
                     0.1 ETH per Card
                  </span>
               </div>
               <div>
                  <Button btnText={"Mint"} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default MintPage;
