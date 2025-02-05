import SearchBar from "@/components/SearchBar";
import {
  FilterIcon,
  LeftIcon2,
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
  boxPadding?: string;
  setSelectedYear?: any;
  addMenuOption?: any;
  startYear?: any;
  endYear?: any;
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
  startYear,
  endYear,
  isTitle = false,
  isTitleName = "",
  isTitleLeftArrow = false,
  titleCss = "text-22",
  boxPadding = "px-5 py-3",
}: FilterTabProps) => {

  const [filterSelectedYear, setFilterSelectedYear] = useState(startYear);

  // const years = Array.from({ length: 4 }, (_, i) => startYear + i);
  const numberOfYears = endYear ? endYear - startYear + 1 : 4;

  const years = Array.from({ length: numberOfYears }, (_, i) => startYear + i);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
    setFilterSelectedYear(e.target.value);
  };

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
      <div
        className={`flex items-center justify-between gap-3 tableTopData ${boxPadding}`}
      >
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
              {isFilter && (
                <div
                  className="flex justify-center items-center w-9 h-9 p-2 rounded-md bg-[#F7F7FE] hover:bg-blue-o-10 border border-blue-o-10 cursor-pointer transition-all duration-300"
                  onClick={onClickFilter}
                >
                  <FilterIcon />
          
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
