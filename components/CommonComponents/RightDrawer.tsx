import React, { useState } from "react";
import { Close, CloseNewIcon, Loader } from "../Icons";

interface RightDrawerProps {
  width: "1/3" | "1/2" | "2/3" |"8/12"| "full"; 
  header: string;
  children: React.ReactNode;
  hideModal: () => void;
  isLoading?: boolean;
}

export const RightDrawer = ({
  width,
  header,
  children,
  hideModal,
  isLoading,
}: RightDrawerProps) => {
  const [open, setOpen] = useState(true);

  const handleModalClose = () => {
    setOpen(false);
    setTimeout(() => {
      hideModal();
    }, 300);
  };
  const widthClass = {
    "1/6": "w-1/6",
    "1/5": "w-1/5",
    "1/4": "w-1/4",
    "1/3": "w-1/3",
    "1/2": "w-1/2",
    "2/3": "w-2/3",
    "3/4": "w-3/4",
    "4/5": "w-4/5",
    "5/6": "w-5/6",
    "8/12":"w-8/12",
    full: "w-full",
    
  }[width]; 
  

  return (
    <>
     
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center overflow-hidden outline-none bg-black/60 focus:outline-none transition-opacity duration-700 ${
          open ? "fadeIn" : "fadeOut pointer-events-none"
        }`}
      ></div>
      {isLoading && <Loader isLoading={isLoading} />}

     
      <div
        className={`fixed z-50 w-full lg:${widthClass} top-0 h-full bg-white shadow-lg right-0 ${
          open ? "slideIn" : "slideOut"
        } ${isLoading ? "hidden" : "visible"}`}
      >
        <div className="flex items-center justify-between gap-4 py-3 md:py-5 px-5 md:px-8 bg-gray-p-150 border-b border-gray-p-350">
          <h3 className=" text-black-b-250 text-base md:text-xl font-medium">
            {header}
          </h3>
          <div className="flex items-center gap-x-5 cursor-pointer" onClick={handleModalClose}>
            <CloseNewIcon />
          </div>
        </div>

        <div className="flex flex-col overflow-hidden h-full">{children}</div>
      </div>
    </>
  );
};
