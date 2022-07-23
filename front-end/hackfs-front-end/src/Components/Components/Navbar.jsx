import React from "react";
import { ethers } from "ethers";
import Button from "./CommonContainers/Button";
import NavLogo from "../../Assets/Images/NavLogo.webp";
import { HashRouter, Link, useLocation } from "react-router-dom";
import NavigationConst from "../Pages/NavigationPages";
import { 
   setAddress, 
   changeBalance, 
   changeContract, 
   addProvider, 
   setNetworkId,
   setCard3StorageContract,
   setWarGameContract,
   addEthersProvider,
   setTotalChips,
} from '../../web3Reducers';
import { useSelector, useDispatch } from 'react-redux';
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';
import warGameAbi from "../../Contracts/warGameAbi.json";
import Card3StorageAbi from '../../Contracts/Card3StorageAbi.json';
const wargameContractAddress = '0xab78347D19358534D9F2C9eFdd18fB07dcec496A';
const card3StorageContractAddress = "0xE1f7dA2D3983cd3Bb7aBF3E4Cb68f91944B889E1";

const NavbarLinkContainer = ({ child = <></> }) => {
   return <ul className="flex items-center text-3xl">{child}</ul>;
};
const NavbarLink = ({ isActive = false, linkText = "test", linkTo = "" }) => {
   return isActive ? (
      <li className="mr-6">
         <Link
            className="text-blue-500 hover:text-blue-800 cursor-pointer"
            to={"/#/" + linkTo}
         >
            {linkText}
         </Link>
      </li>
   ) : (
      <li className="mr-6">
         <Link className="text-gray-400 " to={"/" + linkTo}>
            {linkText}
         </Link>
      </li>
   );
};

const NavbarLinkRightButton = ({
   isLoggedIn = false,
   buttonText = "Connect Wallet",
   onClickCallback = ""
}) => {
   return <Button btnText={buttonText} isDisabled={isLoggedIn} onClickCallback={onClickCallback} />;
};

const NavbarMain = ({ logoText = "placeholder", child = <></> }) => {
   return (
      <ul className="flex items-center gap-x-5">
         {child}
         <li className="text-6xl font-bold">{logoText}</li>
      </ul>
   );
};
const NavbarMainLogo = () => {
   return <img src={NavLogo} alt="Nav_Logo" className="w-14 opacity-50" />;
};

const Navbar = () => {
   const networkId = useSelector((state) => state.web3Reducers.networkId);
   const address = useSelector((state) => state.web3Reducers.address);   
   const dispatch = useDispatch();
   //dispatch(setWaitingForFlip(true))
   const handleWalletConnection = async () => {
      console.log("Connect Wallet");     
      const provider = await detectEthereumProvider();

      if (provider) {
         
         const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
         dispatch(addProvider(provider));
         dispatch(addEthersProvider(ethersProvider));
         
         const chainId = await provider.request({
            method: 'eth_chainId'
         })
         dispatch(setNetworkId(chainId.toString())); 
         const accounts = await provider.request({ method: 'eth_requestAccounts' });
         dispatch(setAddress(accounts[0])); 
         
         const balance = await provider.request({ 
            method: 'eth_getBalance',
            params: [accounts[0], "latest"]
         });
         
         // wrap it from wai to ethers.js format
         dispatch(changeBalance(ethers.utils.formatUnits(balance, 18)))
         // also setting card3StorageContract and warGameContract in here
         const signer = await ethersProvider.getSigner();
         const contract = new ethers.Contract( wargameContractAddress , warGameAbi , signer );
         dispatch(setWarGameContract(contract));
         const card3StorageContract = new ethers.Contract( card3StorageContractAddress , Card3StorageAbi , signer );
         dispatch(setCard3StorageContract(card3StorageContract));    
         const totalChipsInAccount = await card3StorageContract.functions.balanceOf(accounts[0], 55);
         dispatch(setTotalChips(parseInt(totalChipsInAccount)))

      } else {
         alert('Please install MetaMask!');
      }
   }
   const location = useLocation();
   return (
      <div className="flex p-3 justify-between">
         <NavbarMain
            logoText="Cards3"
            child={
               <>
                  <NavbarMainLogo />
               </>
            }
         />
         <NavbarLinkContainer
            child={
               <>
                  <NavbarLink
                     isActive={location.pathname === NavigationConst.HomePage}
                     btnText
                     linkTo={""}
                     linkText="HOME"
                  />
                  <NavbarLink
                     isActive={
                        location.pathname === "/" + NavigationConst.GampePage
                     }
                     linkTo={NavigationConst.GampePage}
                     linkText="GAME"
                  />
                  <NavbarLink
                     isActive={
                        location.pathname === "/" + NavigationConst.MintPage
                     }
                     linkTo={NavigationConst.MintPage}
                     linkText="MINT"
                  />
                  {address ? <NavbarLinkRightButton    
                     isLoggedIn = {true}
                     buttonText = {
                        `${address.slice(0, 4)}...${address.slice(
                           address.length - 4,
                           address.length
                        )}`}
                     onClickCallback = {()=>{console.log("connected")}}
                     />
                     :  <NavbarLinkRightButton onClickCallback={handleWalletConnection}/>}
               </>
            }
         />
      </div>
   );
};

export default Navbar;
