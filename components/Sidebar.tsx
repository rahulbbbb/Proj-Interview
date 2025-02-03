import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
// import { BreadcrumbContext } from "../contexts/BreadCrumbContext";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {
  HomeIcon,
  CoreSetupIcon,
} from "./Icons";

const Sidebar = (props) => {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [isCoreSetupOpen, setIsCoreSetupOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(true);

  // const crumbCtx = useContext(BreadcrumbContext);
  // const itm = crumbCtx.breadcrumbs.filter((item) => item.isCurrent)[0];

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
      {/* <Logo /> */}

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
          customArrow={isCoreSetupOpen ? <IoIosArrowDown /> : <IoIosArrowForward /> }
          className={isCoreSetupOpen && ` active bg-white/10`}
        />
        {isCoreSetupOpen && (
          <div className="flex flex-col">
            <SideBarIcon
              icon={""}
              link="/Home/CoreSetup/LegalEntity"
              title={open && "Legal Entity"}
              // selected={itm && itm.href === "/Home/CoreSetup/LegalEntity"}
              className={"mb-2"}
            />
            <SideBarIcon
              icon={""}
              link="/Home/CoreSetup/LegalEntityAddressMapping"
              title={open && "Legal Entity Address Mapping"}
              // selected={
              //   itm && itm.href === "/Home/CoreSetup/LegalEntityAddressMapping"
              // }
              className={""}
            />
          </div>
        )}
        {/* Manage with Nested Items */}
        
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
  // const router = useRouter();
  return (
    <div
      className={`sidebarItem group relative cursor-pointer transition-all duration-300 mx-4 p-2 rounded-md 
      ${
        selected
          ? "bg-primary-o-600 text-white"
          : "text-gray-o-400/60 hover:text-white md:hover:bg-white/10"
      } ${className}`}
      // onClick={onClick || (() => router.push(link))}
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

// const Logo = ({ link = "#", selected = false }) => (
//   <div className={`sidebar-logo ${selected ? "sidebar-logo-selected" : ""}`}>
//     <Link href={link}>
//       <Image src={require("@/components/img/Logo.svg")} alt="Logo" />
//     </Link>
//   </div>
// );

export default Sidebar;
