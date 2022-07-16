import React from "react";
import Button from "./CommonContainers/Button";

const Navbar_Link_Container = ({ child = <></> }) => {
   return <ul className="flex  items-center">{child}</ul>;
};
const Navbar_Link = ({ isActive = false, linkText = "test" }) => {
   return isActive ? (
      <li className="mr-6">
         <a className="text-blue-500 hover:text-blue-800 cursor-pointer">
            {linkText}
         </a>
      </li>
   ) : (
      <li className="mr-6">
         <a className="text-gray-400 cursor-not-allowed">{linkText}</a>
      </li>
   );
};
const Navbar_Link_Right_Button = ({
   isLoggedIn = false,
   buttonText = "Connect Wallet",
}) => {
   return <Button btnText={buttonText} isDisabled={isLoggedIn} />;
};

const Navbar_Main = ({ logoText = "placeholder", child = <></> }) => {
   return (
      <ul className="flex items-center">
         <li className="text-5xl font-bold">{logoText}</li>
         {child}
      </ul>
   );
};
const Navbar_Main_Logo = () => {};

const Navbar = () => {
   return (
      <div className="flex p-3 justify-between">
         <Navbar_Main
            logoText="Cards3"
            child={
               <>
                  <Navbar_Main_Logo />
               </>
            }
         />
         <Navbar_Link_Container
            child={
               <>
                  <Navbar_Link isActive={true} />
                  <Navbar_Link />
                  <Navbar_Link />
                  <Navbar_Link_Right_Button />
               </>
            }
         />
      </div>
   );
};

export default Navbar;
