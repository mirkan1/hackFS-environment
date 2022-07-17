import React from "react";

function InfoPill({ infoText = "", infoLable = "" }) {
   return (
      <div className="bg-slate-200 shadow-xl text-gray-600 text-xl  py-2 px-4 rounded flex flex-col">
         <span className="text-sm text-black font-bold rounded ">
            {infoLable}
         </span>
         {infoText}
      </div>
   );
}
export default InfoPill;
