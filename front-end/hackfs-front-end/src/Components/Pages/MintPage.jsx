import React from "react";
import heroImage from "../../Assets/Images/HeroImage.png";
// src={heroImage}
import Button from "../Components/CommonContainers/Button";
import { useSelector, useDispatch } from 'react-redux';
import { setTotalChips } from '../../web3Reducers';
import { ethers } from "ethers";
function MintPage() {
   const etherProvider = useSelector((state) => state.web3Reducers.etherProvider);  
   const card3StorageContract = useSelector((state) => state.web3Reducers.card3StorageContract);  
   const address = useSelector((state) => state.web3Reducers.address);  
   
   const dispatch = useDispatch();
   const mintCHIP = async () => {
      if (etherProvider && card3StorageContract && address) {
         const quantity = document.getElementById("quantity").value;
         const ETH1 = quantity * ethers.utils.parseUnits('0.1', 'ether') // * 10 ** 18;
         const tx = await card3StorageContract.mint(55, quantity, { 
            value: ETH1.toString()
         });
         console.log("total eth", ETH1)
         const totalChips = await card3StorageContract.functions.balanceOf(address, 55);
         dispatch(setTotalChips(totalChips));
      }

   } 
   return (
      <div className="flex gap-x-8">
         <img alt="hero_image" className="h-96" />
         <div className="flex flex-col text-2xl font-medium gap-y-8 justify-between w-96">
            <p>
               The world’s first decentralized card club where each card dealt
               is an NFT owned by someone. If your card is involved in a winning
               hand, you also win.
            </p>
            <div className="flex flex-col gap-y-4">
               <span className="text-base">
                  How Many CHIP would you like to mint ?
               </span>
               <div className="flex gap-x-2 items-center">
                  <input className="w-32 h-10 rounded" id="quantity" />
                  <span className="text-gray-500 text-sm">
                     0.1 ETH per Card
                  </span>
               </div>
               <div>
                  <Button btnText={"Mint"} onClickCallback={mintCHIP} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default MintPage;
