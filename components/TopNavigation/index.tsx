import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CalenderIcon, NotificationIcon, SettingIcon } from "@/components/Icons";

interface navigationProps {
  className?: string;
  handleSettingClick?: () => void;
  handleAlertClick?: () => void;
  handleCalenderClick?: () => void;
}

export const TopNavigation = ({
  className = "",
  handleSettingClick,
  handleAlertClick,
  handleCalenderClick,
}: navigationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const UserCircle = () => (
    <div className="top-profile-wrap relative" onClick={() => setOpen(!open)}>
      <div className="flex flex-row items-center gap-x-3 top-navigation-icon">
        <span className="relative flex shrink-0 flex-col items-center justify-center rounded-full bg-soft h-9 w-9 border border-gray-o-300">
          <img
            className="aspect-square h-full w-full rounded-full object-cover"
            src="https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
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
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
          viewBox="-0.39 0 66.783 66.783"
          // {...props}
        >
          <path
            fill="#00bcf2"
            d="M10.435 0C4.59 0 .457 4.591.457 10.435v12.717H66L49.304 9v7.043H5.217v-5.608c0-2.713 2.557-5.87 5.479-5.87H55.76c2.713 0 5.413 2.948 5.413 5.87v2.478l4.565 4.63v-7.108C65.74 4.59 61.604 0 55.761 0H10.435zM0 27.783l16.696 13.76v-9h44.087v7.5c0 2.714-2.348 6.522-5.479 6.522h-44.87c-2.712 0-5.412-3.6-5.412-6.522v-2.478L.457 33v7.043c0 5.844 4.134 11.087 9.978 11.087h10.043l22.305 15.653-1.63-15.848H55.76c5.843 0 9.978-5.452 9.978-11.087V27.783H0z"
          />
        </svg> */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width={42}
          height={42}
          viewBox="0 0 64 64"
          // {...props}
        >
          <path d="M26.144 27.5a.5.5 0 0 1 .5-.5h4a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5Zm-4 0a.5.5 0 0 0-.5-.5h-4a.5.5 0 1 0 0 1h4a.5.5 0 0 0 .5-.5Zm11 5a.5.5 0 0 0-.5-.5h-4a.5.5 0 1 0 0 1h4a.5.5 0 0 0 .5-.5Zm-9 0a.5.5 0 0 0-.5-.5h-4a.5.5 0 1 0 0 1h4a.5.5 0 0 0 .5-.5Zm2.5 4.5h-4a.5.5 0 1 0 0 1h4a.5.5 0 1 0 0-1Zm-15.925 1.006a.499.499 0 0 0-.577.409c-.266 1.548-.397 3.8-.416 7.086a.5.5 0 0 0 .497.503h.003a.5.5 0 0 0 .5-.497c.018-3.23.146-5.43.401-6.924a.5.5 0 0 0-.408-.577Zm46.092-2.13-3.768 3.158.432 4.896a.501.501 0 0 1-.542.542l-3.89-.343c.643 2.612.936 4.132.938 4.148a.501.501 0 0 1-.431.59c-6.827.816-15.7 1.221-26.898 1.221-4.645 0-9.69-.07-15.155-.208a.5.5 0 0 1-.487-.512c.327-13.184 2.61-30.757 2.634-30.933A.5.5 0 0 1 10.14 18h3.046a3.512 3.512 0 0 1-.042-.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 .171-.026.335-.05.5h1.092a3.512 3.512 0 0 1-.042-.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 .171-.026.335-.05.5h1.092a3.512 3.512 0 0 1-.042-.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 .171-.026.335-.05.5h2.965c.59 0 1.114.315 1.336.802.84 1.947 1.644 3.94 2.412 5.937l1.307-1.56a.516.516 0 0 1 .766 0l3.157 3.768 4.897-.432a.498.498 0 0 1 .542.542l-.433 4.896 3.769 3.157a.5.5 0 0 1 0 .767ZM30.2 18h4.894a2.503 2.503 0 0 0-2.45-3 2.503 2.503 0 0 0-2.5 2.5c0 .17.022.336.056.5Zm-8 0h4.894a2.503 2.503 0 0 0-2.45-3 2.503 2.503 0 0 0-2.5 2.5c0 .17.022.336.056.5Zm-8 0h4.894a2.503 2.503 0 0 0-2.45-3 2.503 2.503 0 0 0-2.5 2.5c0 .17.022.336.056.5ZM8.023 48.893c2.435.06 4.778.105 7.045.137a3064.897 3064.897 0 0 0-2.34-13.607.5.5 0 1 1 .984-.172c.02.111 1.872 10.758 2.372 13.792 1.242.016 2.462.027 3.654.035-3.875-15.32-7.758-25.092-9.323-28.742-.575 4.714-2.092 17.952-2.392 28.557Zm40.87-.956c-.143-.682-.433-2.012-.891-3.854l-3.122 3.725a.5.5 0 0 1-.766 0l-3.157-3.768-4.896.432a.501.501 0 0 1-.542-.542l.432-4.896-3.769-3.157a.5.5 0 0 1 0-.767l3.77-3.157-.433-4.896a.501.501 0 0 1 .542-.542l4.896.432 1.118-1.335a160.746 160.746 0 0 0-2.594-6.405c-.053-.116-.232-.207-.421-.207h-3.267a3.496 3.496 0 0 1-3.149 2 .5.5 0 1 1 0-1 2.49 2.49 0 0 0 1.988-1h-6.839a3.496 3.496 0 0 1-3.149 2 .5.5 0 1 1 0-1 2.49 2.49 0 0 0 1.988-1h-6.839a3.496 3.496 0 0 1-3.149 2 .5.5 0 1 1 0-1 2.49 2.49 0 0 0 1.988-1h-7.71c1.2 2.692 5.541 12.984 9.85 30.084 11.748.046 21.022-.334 28.12-1.148Zm6.819-12.443-3.51-2.942a.5.5 0 0 1-.178-.427l.403-4.562-4.562.403a.497.497 0 0 1-.427-.177l-2.941-3.51-2.941 3.51a.487.487 0 0 1-.427.177l-4.562-.403.403 4.562a.5.5 0 0 1-.177.427l-3.51 2.942 3.51 2.94a.5.5 0 0 1 .177.428l-.403 4.562 4.562-.403a.498.498 0 0 1 .427.177l2.94 3.51 2.942-3.51a.504.504 0 0 1 .427-.177l4.562.403-.403-4.562a.5.5 0 0 1 .177-.428l3.51-2.94Zm-8.242.296c.674 1.103.713 2.335.107 3.377-.53.916-1.506 1.515-2.631 1.676-.027.122-.051.235-.058.29-.072.444-.75.436-.82 0l-.051-.261c-1.365-.16-2.533-1.073-2.886-1.934-.32-.778-.083-1.545.588-1.908.72-.388 1.618-.166 2.044.507.133.203.513.516.669.498.234-.016.413-.108.497-.253.106-.182.017-.402-.076-.553-.107-.17-.754-.6-1.064-.806-.988-.655-2.217-1.471-2.407-2.763a3.145 3.145 0 0 1 .74-2.527c.482-.553 1.153-.899 1.903-1.019l.042-.215c.07-.436.749-.444.821 0 .004.037.017.1.033.173 1.254.114 2.119.857 2.428 1.404.407.717.198 1.563-.485 1.968-.69.41-1.589.23-2.049-.407a.352.352 0 0 0-.267-.11c-.07.004-.085.021-.101.04a.392.392 0 0 0-.07.296c.055.045.45.348 1.145.81.743.492 1.512 1.002 1.947 1.717Zm-.854.52c-.32-.525-.994-.972-1.646-1.405-1.044-.693-1.52-1.074-1.583-1.497a1.384 1.384 0 0 1 .307-1.1c.202-.23.466-.356.786-.38.642-.043 1.032.378 1.134.507.168.232.5.292.74.148.262-.155.23-.428.125-.615-.187-.331-.956-.989-2.082-.906-.609.044-1.15.303-1.523.729a2.143 2.143 0 0 0-.502 1.724c.124.85 1.105 1.5 1.97 2.075.673.447 1.165.788 1.365 1.117.326.534.358 1.109.087 1.577-.254.437-.723.71-1.287.748-.898.062-1.578-.944-1.585-.954a.535.535 0 0 0-.456-.235.574.574 0 0 0-.273.067c-.298.161-.195.507-.137.648.24.59 1.309 1.421 2.535 1.34.917-.063 1.71-.525 2.12-1.233.417-.716.382-1.574-.095-2.355Z" />
        </svg> */}
        <div className="flex justify-end border-r md:border-r-0 md:border-l border-gray-o-300 md:justify-between w-full pl-4 mxl:pl-7 md:ml-3 rightMenu">
       
          <div className="flex items-center gap-4 isSerchQuickBtns"></div>
          <div className="flex items-center gap-4 md:gap-8 rightMenu">
            <div className="flex items-center rightmainMenu">
              {
                <div className="flex items-center gap-1 rightMenuIcons border-r border-gray-o-300 h-9 px-4">
                  <div
                    className="group relative cursor-pointer p-2 rounded-md hover:bg-gray-p-100"
                    onClick={() => handleCalenderClick?.()}
                  >
                    <CalenderIcon />
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
                      Calendar
                    </span>
                  </div>

                  <div
                    className="group relative cursor-pointer p-2 rounded-md hover:bg-gray-p-100"
                    onClick={() => handleAlertClick?.()}
                  >
                    <NotificationIcon />
                    <div className="w-1.5 h-1.5 bg-[#FF4D4D] rounded-full absolute top-2 right-1"></div>
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
