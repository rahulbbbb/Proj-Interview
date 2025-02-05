import SearchBar from "@/components/SearchBar";
import {
  DownWhiteArrow,
  FilterIcon,
  LeftIcon2,
  PlusIcon,
} from "@/components/Icons";
import React, { useEffect, useRef, useState } from "react";

interface QuickFilter {
  name: string;
  id: string;
}

interface FilterTabProps {
  isQuickFilter?: boolean;
  quickFilters?: QuickFilter[];
  onClickQuickFilter?: (item: QuickFilter) => void;
  quickFilterSelected?: QuickFilter;
  isLeft?: boolean;
  isSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  handleCrossClick?: () => void;
  isFilter?: boolean;
  onClickFilter?: () => void;
  isAddNewBtn?: boolean;
  isAddNewBtnDropdown?: boolean;
  isAddNewBtnName?: string;
  isAddNewBtnIcon?: React.ReactNode | React.FC;
  handleAddNewBtnClick?: () => void;
  isAddNewBtnCss?: string;
  isTitle?: boolean;
  isTitleName?: string;
  isTitleLeftArrow?: boolean;
  showStatus?: boolean;
  handleTitleLeftArrowClick?: () => void;
  titleCss?: string;
  boxPadding?:string;
  setSelectedYear?:any;
  addMenuOption?: any;
  startYear?:any
  endYear?:any

}

const FilterTab = ({
  isSearch = false,
  searchValue,
  handleTitleLeftArrowClick = () => {
    return;
  },
  setSelectedYear,
  onSearchChange,
  handleCrossClick,
  isFilter = false,
  onClickFilter,
  isAddNewBtn = false,
  isAddNewBtnDropdown = false,
  isAddNewBtnName = "",
  isAddNewBtnIcon = null,
  startYear,
  endYear,
  handleAddNewBtnClick = () => {
    return;
  },
  isAddNewBtnCss = "",
  isTitle = false,
  isTitleName = "",
  isTitleLeftArrow = false,
  showStatus = false,
  titleCss = "text-22", 
  boxPadding="px-5 py-3",
  addMenuOption,
}: FilterTabProps) => {
  // const [filterSelectedYear, setfilterSelectedYear] = useState(2025); 
  // const currentYear = new Date().getFullYear();
  // const [filterSelectedYear, setFilterSelectedYear] = useState(currentYear);
  // const years = Array.from({ length: 7 }, (_, i) => currentYear + 3 - i);

  const [filterSelectedYear, setFilterSelectedYear] = useState(startYear);

  // const years = Array.from({ length: 4 }, (_, i) => startYear + i);
  const numberOfYears = endYear ? endYear - startYear + 1 : 4;

  const years = Array.from({ length: numberOfYears }, (_, i) => startYear + i);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
    setFilterSelectedYear(e.target.value)
  };

  // new addmenu changes
    const [openAddMenu, setopenAddMenu] = useState(false);
    const optionDivRef = useRef<HTMLDivElement | null>(null);
  
    const handleClickOutside = (event) => {
      if (optionDivRef.current && !optionDivRef.current.contains(event.target)) {
        setopenAddMenu(false);
      }
    };
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    // end
  return (
    <>
      <div className={`flex items-center justify-between gap-3 tableTopData ${boxPadding}`}>
        {isTitle && (
          <div
            className={`flex items-center ${isTitleLeftArrow ? "gap-3" : ""}`}
          >
            {isTitleLeftArrow && (
              <div
                onClick={() => {
                  handleTitleLeftArrowClick();
                }}
              >
                <span className="border border-gray-o-90 hover:border-gray-o-80 hover:bg-gray-o-70 rounded-md flex items-center justify-center h-7 md:h-9 w-7 md:w-9 cursor-pointer">
                  <LeftIcon2 />
                </span>{" "}
                {isTitleLeftArrow}
              </div>
            )}
            <div className={` text-black-b-250 ${titleCss}`}>{isTitleName}</div>
          </div>
        )}

        <div className="flex items-center gap-1 md:gap-3 ml-auto">
          {showStatus && (
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pvDarkTextBlue"></span>
                <span className="text-sm text-gray-600">Ongoing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-DarkYellowText"></span>
                <span className="text-sm text-gray-600">Upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pvTextDarkGreen"></span>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="text-sm text-gray-600">Cancelled</span>
              </div>
              <div className="flex items-center">
              {/* <select
        value={filterSelectedYear}
        onChange={handleChange}
        className="border border-gray-400 rounded-md py-2 px-4 bg-white text-sm text-gray-600 focus:outline-none"
      >
        <option value={2026}>2026</option>
        <option value={2025}>2025</option>
        <option value={2024}>2024</option>
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
      </select> */}
       <select
      value={filterSelectedYear}
      onChange={handleChange}
      className="border border-gray-400 rounded-md py-2 px-4 bg-white text-sm text-gray-600 focus:outline-none"
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
              </div>
            </div>
          )}
          {isAddNewBtn && (
            <div className="relative ">
              <div
                className={`flex justify-center items-center gap-2 px-3 py-2 rounded-md cursor-pointer bg-primary-o-600 hover:bg-primary-o-550 text-white transition-all duration-300 text-sm group  ${isAddNewBtnCss} ${
                  isAddNewBtnDropdown && `pr-10`
                }`}
                onClick={() => {
                  handleAddNewBtnClick();
                }}
              >
              <span>{isAddNewBtnIcon ? React.isValidElement(isAddNewBtnIcon) ? isAddNewBtnIcon : <PlusIcon /> : <PlusIcon />}</span>

                <span>{isAddNewBtnName || "Add New"}</span>
                {isAddNewBtnDropdown && (
                  <div className="addNewdropdown bg-primary-o-600 group-hover:bg-primary-o-550  transition-all duration-300 rounded-tr-md rounded-br-md">
                    <DownWhiteArrow />
                  </div>
                )}
              </div>
            </div>
          )}

{openAddMenu && addMenuOption && (
                <div
                  className=" w-max rounded-md z-10 md:z-40 absolute top-10 left-0"
                  ref={optionDivRef}
                >
                  <div className="bg-white rounded-md shadow-md p-2 border space-y-1">
                    {addMenuOption?.map((e:any, i:number) => (
                      <div
                        key={e.text}
                        onClick={()=>{e.action();setopenAddMenu(false)}}
                        className={`${
                          i == addMenuOption.length - 1 &&
                          "rounded-b-md border-t-0"
                        } p-2 cursor-pointer font-normal text-sm text-gray-p-450 hover:bg-[#E9F5FF] hover:text-primary-o-600 transition-all leading-none flex gap-2 rounded-md`}
                      >
                        {e.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}

          {/* Quick filters */}
          {/* {isQuickFilter && (
            <div className="w-fit">
              <GlobalQuickFilter
                filters={quickFilters}
                onClickQuickFilter={onClickQuickFilter}
                quickFilterSelected={quickFilterSelected}
                isLeft={isLeft}
              />
            </div>
          )} */}
          {/* search bar */}
          {(isFilter || isSearch) && (
            <div className="flex items-center justify-end gap-2">
              {isSearch && (
                <div className="w-fit">
                  <SearchBar
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    handleCrossClick={handleCrossClick}
                  />
                </div>
              )}
              {/* filter icon */}
              {isFilter && (
                <div
                  className="flex justify-center items-center w-9 h-9 p-2 rounded-md bg-[#F7F7FE] hover:bg-blue-o-10 border border-blue-o-10 cursor-pointer transition-all duration-300"
                  onClick={onClickFilter}
                >
                  <FilterIcon />
                  {/* <FilterSearchIcon fill="#424242" />
                <span className="text-sm font-normal text-gray-o-600">
                  Filter
                </span> */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterTab;
