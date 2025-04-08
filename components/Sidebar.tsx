import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HomeIcon, PhoneIcon, StarIcon } from "./Icons";

const Sidebar = ({ open, setOpen }) => {

  const [isCoreSetupOpen, setIsCoreSetupOpen] = useState(false);
  // const [open, setOpen] = useState<boolean>(true);

  const toggleSidebarAndMenu = (menuSetter, menuState) => {
    if (!open) {
      setOpen(true);
      menuSetter(true);
    } else {
      menuSetter(!menuState);
    }
  };

  console.log(isCoreSetupOpen)

  const handleSidebarToggle = () => {
    if (open && (isCoreSetupOpen)) {
      setIsCoreSetupOpen(false);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div
      className={`bg-[#0E0071] mxl:min-h-screen relative hideScrollbar menu-mobile z-40 transition-all duration-500 text-white top-0 bottom-0 left-0 shadow-custom overflow-visible mb-4 ${
        open ? "w-55" : "w-18"
      }`}
    >
      <Logo open={open} />

      <div className="flex flex-col gap-2 ">
        <SideBarIcon
          icon={<HomeIcon />}
          title={open && "Dashboard"}
          link="#"
          selected={false}
          onClick={() =>
            toggleSidebarAndMenu(setIsCoreSetupOpen, isCoreSetupOpen)
          }
          customArrow={isCoreSetupOpen ? <IoIosArrowDown /> : <IoIosArrowForward /> }
          className={isCoreSetupOpen && ` active bg-white/10`}
        />
          {isCoreSetupOpen && (
          <div className="flex flex-col">
            <SideBarIcon
              icon={""}
              link="#"
              title={open && "Sub child one"}
              // selected={itm && itm.href === "/Home/CoreSetup/LegalEntity"}
              className={"mb-2"}
            />
            <SideBarIcon
              icon={""}
              link="#"
              title={open && "Sub child two"}
              // selected={
              //   itm && itm.href === "/Home/CoreSetup/LegalEntityAddressMapping"
              // }
              className={"mb-2"}
            />
          </div>
        )}
           <SideBarIcon
          icon={<StarIcon />}
          title={open && "Review Management"}
          link="#"
          selected={false}
          // onClick={() =>
          //   toggleSidebarAndMenu(setIsCoreSetupOpen, isCoreSetupOpen)
          // }
          // customArrow={
          //   isCoreSetupOpen ? <IoIosArrowDown /> : <IoIosArrowForward />
          // }
          className={isCoreSetupOpen && ` active bg-white/10`}
        />
        <SideBarIcon
          icon={<PhoneIcon />}
          title={open && "Call Management"}
          link="#"
          selected={false}
          // onClick={() =>
          //   toggleSidebarAndMenu(setIsCoreSetupOpen, isCoreSetupOpen)
          // }
          // customArrow={
          //   isCoreSetupOpen ? <IoIosArrowDown /> : <IoIosArrowForward />
          // }
          className={isCoreSetupOpen && ` active bg-white/10`}
        />
      </div>
    </div>
  );
};

const SideBarIcon = ({
  icon,
  title = "tooltip",
  link = "#",
  selected = false,
  onClick = null,
  customArrow = null,
  className,
}) => {
  return (
    <div
      className={`sidebarItem group relative cursor-pointer transition-all duration-300 mx-4 p-2 rounded-md 
      ${
        selected
          ? "bg-primary-o-600 text-white"
          : "text-gray-o-400/60 hover:text-white md:hover:bg-white/10"
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-2 text-white">
        <div className="flex items-center gap-3">
          <span className="w-5 flex justify-center">{icon}</span>
          {title}
        </div>
        {customArrow && <span>{customArrow}</span>}
  

      </div>
    </div>
  );
};

const Logo = ({ link = "#", open }) => (
  <div className="flex justify-start items-center my-4 px-4">
    <Link href={link}>
      <div className="relative">
        <div
          className={`
            flex items-center justify-center 
            bg-[#7A82FF] text-white font-bold 
            rounded-[15px] transition-all duration-300 
            ${open ? "w-16 h-16 text-2xl" : "w-10 h-10 text-base"}
          `}
        >
          D
        </div>

        <div
          className={`
            absolute bg-green-500 border-2 border-white rounded-full
            transition-all duration-300
            ${open ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]"}
          `}
          style={{
            bottom: "4px",
            right: "4px",
            transform: "translate(50%, 50%)",
          }}
        ></div>
      </div>
    </Link>
  </div>
);

export default Sidebar;
