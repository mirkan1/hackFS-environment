import React from "react";
import heroImage from "../../Assets/Images/HeroImage.png";
import Button from "../Components/CommonContainers/Button";

function HomePage() {
   return (
      <div className="flex gap-x-8">
         <img src={heroImage} alt="hero_image" className="h-96" />
         <div className="flex flex-col text-2xl font-medium gap-y-8 justify-between w-96">
            <p>
               The world’s first decentralized card club where each card dealt
               is an NFT owned by someone. If your card is involved in a winning
               hand, you also win.
            </p>
            {/* Might need to use a central state to tell is wallet connected or not */}
            {false ? (
               <div className="flex justify-between">
                  <Button btnText="Mint Cards" />
                  <Button btnText="Play Game" />
               </div>
            ) : (
               <div>
                  <Button btnText="Connect Wallet" />
               </div>
            )}
         </div>
      </div>
   );
}

export default HomePage;
