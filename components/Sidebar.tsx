import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HomeIcon, CoreSetupIcon } from "./Icons";

const Sidebar = (props) => {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isCoreSetupOpen, setIsCoreSetupOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(true);

  const toggleSidebarAndMenu = (menuSetter, menuState) => {
    if (!open) {
      setOpen(true);
      menuSetter(true);
    } else {
      menuSetter(!menuState);
    }
  };

  const handleSidebarToggle = () => {
    if (open && (isManageOpen || isMemberOpen || isCoreSetupOpen)) {
      setIsManageOpen(false);
      setIsMemberOpen(false);
      setIsCoreSetupOpen(false);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div
      className={`bg-blue-o-80 mxl:min-h-screen relative hideScrollbar menu-mobile z-40 transition-all duration-500 text-white top-0 bottom-0 left-0 shadow-custom overflow-visible mb-4 ${
        open ? "w-55" : "w-18"
      }`}
    >
      <Logo open={open} />

      <div
        className="absolute -right-14 top-3 cursor-pointer z-20 w-9 h-9 rounded-md hidden mxl:flex border border-gray-o-300 bg-white hover:bg-gray-o-70 transition-all duration-150 justify-center items-center flex-col p-1.5 menu-btn"
        onClick={handleSidebarToggle}
      >
        <div className="w-5 relative">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className={`bar ${!open ? "active" : ""}`}></span>
        </div>
      </div>

      <div className="flex flex-col gap-2 menuwrap">
        <SideBarIcon
          icon={<HomeIcon />}
          title={open && "Home"}
          link="/Home"
          // selected={itm && itm.href === "/Home"}
          className={""}
        />
        <SideBarIcon
          icon={<CoreSetupIcon />}
          title={open && "Core Setup"}
          link="#"
          selected={false}
          onClick={() =>
            toggleSidebarAndMenu(setIsCoreSetupOpen, isCoreSetupOpen)
          }
          customArrow={
            isCoreSetupOpen ? <IoIosArrowDown /> : <IoIosArrowForward />
          }
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
  <div className={`flex justify-start items-center my-4 px-4`}>
    <Link href={link}>
      <Image
        src="/4d3301a4-c706-4c21-a56a-bc8678816c66.jpeg"
        alt="Logo"
        width={open ? 50 : 30}
        height={open ? 50 : 30}
        className={`object-cover rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
          open ? "w-16 h-16" : "w-10 h-9"
        }`}
      />
    </Link>
  </div>
);

export default Sidebar;
