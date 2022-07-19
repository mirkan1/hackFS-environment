import React from "react";
import Button from "./CommonContainers/Button";
import NavLogo from "../../Assets/Images/NavLogo.webp";
import { HashRouter, Link } from "react-router-dom";
import NavigationConst from "../Pages/NavigationPages";

const NavbarLinkContainer = ({ child = <></> }) => {
   return <ul className="flex  items-center text-3xl">{child}</ul>;
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
}) => {
   return <Button btnText={buttonText} isDisabled={isLoggedIn} />;
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
                     isActive={true}
                     btnText
                     linkTo="home"
                     linkText="HOME"
                  />
                  <NavbarLink
                     linkTo={NavigationConst.GampePage}
                     linkText="GAME"
                  />
                  <NavbarLink
                     linkTo={NavigationConst.MintPage}
                     linkText="MINT"
                  />
                  <NavbarLinkRightButton />
               </>
            }
         />
      </div>
   );
};

export default Navbar;
