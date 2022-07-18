import React from "react";
import Button from "../Components/CommonContainers/Button";

function WalletNotConnectedPage() {
   return (
      <div className="flex flex-col  gap-y-5">
         <span className="text-2xl font-bold">
            Connect Wallet to Proceed !!
         </span>
         <Button btnText="Connect Wallet" />
      </div>
   );
}

export default WalletNotConnectedPage;
