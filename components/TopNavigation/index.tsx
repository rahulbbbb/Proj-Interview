import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  QueIcon,
  NotificationIcon,
  SettingIcon,
  TranslateIcon,
  Icon1,
  SearchIcon,
} from "@/components/Icons";
import { IoIosArrowForward } from "react-icons/io";

interface navigationProps {
  className?: string;
  handleSettingClick?: () => void;
  onToggleSidebar?: () => void;
}

export const TopNavigation = ({
  className = "",
  handleSettingClick,
  onToggleSidebar,
}: navigationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const UserCircle = () => (
    <div className="top-profile-wrap relative" onClick={() => setOpen(!open)}>
      <div className="flex flex-row items-center gap-x-3 top-navigation-icon">
        <span
          className="
            flex items-center justify-center 
            w-10 h-10 
            rounded-[15px] 
            bg-[#7A82FF] 
            text-white 
            font-bold 
            text-base
          "
        >
          D
        </span>
      </div>
      <div
        ref={dropdownRef}
        className={`profileDropdown absolute top-full right-0 w-full min-w-28 bg-white rounded-md shadow-md overflow-hidden transition duration-300 ${
          open ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        <ul>
          <li
            className="py-2 px-6 cursor-pointer text-sm font-normal text-black-b-300 bg-white hover:bg-primary-o-600 hover:text-white transition-all leading-none"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    return;
  };

  return (
    <>
      <div className={clsx("top-navigation", className)}>
        <div className="cursor-pointer" onClick={onToggleSidebar}>
          <div className="w-5 flex flex-col gap-[3px] h-auto">
            <span className="block w-full h-[3px] bg-[#0070FC]"></span>
            <span className="block w-full h-[3px] bg-[#0070FC]"></span>
            <span className="block w-full h-[3px] bg-[#0070FC]"></span>
          </div>
        </div>

        <div className="flex justify-end border-r md:border-r-0 md:border-l border-gray-o-300 md:justify-between w-full pl-4 mxl:pl-7 md:ml-3 rightMenu">
          <div className="flex items-center gap-4 isSerchQuickBtns">
            <img src="/nissan-icon.svg" alt="Logo" className="w-10 h-10" />
            <div className="flex items-center gap-1 text-left font-medium text-[14px] font-poppins">
              <span>Nissan, India</span>
              <IoIosArrowForward className="text-lg" />
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8 rightMenu">
            <div className="flex items-center rightmainMenu">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-[#FCFCFC] rounded-md border border-[#00000019] focus:outline-none  text-sm placeholder:text-[#6A6E72]"
                />
              </div>
              {
                <div className="flex items-center gap-1 rightMenuIcons border-r border-gray-o-300 h-9 px-4">
                  <div className="group relative cursor-pointer p-2 rounded-md hover:bg-gray-p-100">
                    <NotificationIcon />
                    <div className="absolute top-1 -right-1 bg-blue-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none shadow-md">
                      2
                    </div>
                    <span
                      className="
               absolute top-8 left-1/2 -translate-x-1/2
               bg-gray-800 text-white text-xs 
               px-2 py-1 rounded-md
               invisible group-hover:visible
               transition-opacity duration-200
               whitespace-nowrap
               z-50
               before:content-[''] before:absolute before:-top-2 before:left-1/2
               before:-translate-x-1/2 before:border-4 before:border-transparent
               before:border-b-gray-800
             "
                    >
                      Notifications
                    </span>
                  </div>
                  <div className="group relative cursor-pointer p-2 rounded-md hover:bg-gray-p-100">
                    <TranslateIcon />
                  </div>
                  <div
                    className="group relative cursor-pointer p-2 rounded-md hover:bg-gray-p-100"
                    onClick={() => handleSettingClick?.()}
                  >
                    <SettingIcon />
                    <span
                      className="
               absolute top-8 left-1/2 -translate-x-1/2
               bg-gray-800 text-white text-xs 
               px-2 py-1 rounded-md
               invisible group-hover:visible
               transition-opacity duration-200
               whitespace-nowrap
               z-50
               before:content-[''] before:absolute before:-top-2 before:left-1/2
               before:-translate-x-1/2 before:border-4 before:border-transparent
               before:border-b-gray-800
             "
                    >
                      Settings
                    </span>
                  </div>
                  <div className="group relative cursor-pointer p-2 rounded-md hover:bg-gray-p-100">
                    <QueIcon />
                  </div>
                  <div className="group relative cursor-pointer p-2 rounded-md hover:bg-gray-p-100">
                    <Icon1 />
                  </div>
                </div>
              }
              <div className="mxl:ml-3">
                <UserCircle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
