import React from "react";

function Button({
   btnText,
   isDisabled = false,
   onClickCallback = () => {},
   xtraCss = "",
}) {
   return !isDisabled ? (
      <button
         className={
            "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded " +
            xtraCss
         }
         onClick={onClickCallback}
      >
         {btnText}
      </button>
   ) : (
      <button
         class={
            "bg-gray-400 text-black font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed " +
            xtraCss
         }
      >
         {btnText}
      </button>
   );
}

function CircularButton({
   btnText,
   isDisabled = false,
   onClickCallback = () => {},
   xtraCss = "",
}) {
   return !isDisabled ? (
      <button
         className={
            "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full " +
            xtraCss
         }
         onClick={onClickCallback}
      >
         {btnText}
      </button>
   ) : (
      <button
         class={
            "bg-gray-400 text-black font-bold py-2 px-4 rounded-full opacity-50 cursor-not-allowed " +
            xtraCss
         }
      >
         {btnText}
      </button>
   );
}

export { CircularButton };

export default Button;
