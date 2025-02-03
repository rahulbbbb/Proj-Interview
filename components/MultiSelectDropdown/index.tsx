import React, { useState, useEffect, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
import { Close } from "@/components/Icons"; 

export interface MultiSelect {
  options: { code: string; name: string; icon?: string, isDisabled?: boolean }[];
  title?: string;
  selectedValue: (value: string) => void;
  isArray?: boolean;
  openProp?: boolean;
  name?: any;
  valueObj?: any;
  keyToReset?: string;
  reset?: Array<string>;
  setReset?: any;
  error?: any;
  isLoader?: boolean;
  showOptionsOnly?: boolean;
  onOutSideClick?: () => void;
  clsName?: string;
}

const MultiSelectDropDown = ({
  options,
  title,
  selectedValue,
  isArray = false,
  openProp = true,
  name = [],
  valueObj = [],
  reset,
  keyToReset,
  setReset,
  error,
  isLoader = false,
  showOptionsOnly = false,
  clsName,
  onOutSideClick = () => { }
}: MultiSelect) => {
  const [selectedOptions, setSelectedOptions] = useState(
    valueObj !== null ? valueObj : []
  );
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrop, setIsDrop] = useState(showOptionsOnly ? true : false);
  const [selectedOptionNames, setSelectedOptionNames] = useState(
    name !== null ? name : []
  );
  const renderRef = useRef(false)

  const dropDownList = useRef<any>(null);

  useEffect(() => {
    if (reset?.includes(keyToReset ?? "")) {
      setFilteredOptions(options ?? []);
      setSelectedOptions(valueObj ?? []);
      setSelectedOptionNames(name ?? []);
      setSearchTerm("")
      if (typeof setReset == "function") {
        setReset([]);
      }
    }
  }, [reset]);

  useEffect(() => {
    if (!renderRef.current) {
      renderRef.current = true;
      return;
    }
  
    if (isArray) {
      selectedValue(selectedOptionNames);
    } else {
      selectedValue(selectedOptions);
    }
  }, [selectedOptions]);
  

  useEffect(() => {
    const filtered =
      options &&
      options?.filter((option) =>
        option?.name?.toLowerCase()?.startsWith(searchTerm.toLowerCase())
      );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  const toggleOption = (option: {
    code: string;
    name: string;
    icon?: string;
  }) => {
    const isSelected = selectedOptionNames.includes(option.name);
    const allSelected = selectedOptionNames.includes("All");
    setSelectedOptionNames((prevSelected: []) => {
      if (isSelected) {
        if (option.name === "All") {
          return []
        }
        else {
          if (allSelected) {
            return prevSelected?.filter((item) => item !== "All" && item !== option.name)
          }
          else {
            return prevSelected?.filter((item) => item !== option.name);
          }
        }
      }
      else if (option.name === "All") {
        return options.map(trs => trs.name)
      }
      else {
        return [...prevSelected, option.name];
      }
    });

    setSelectedOptions(
      (prevSelected: { code: string; name: string; icon?: string }[]) => {
        if (isSelected) {
          if (option.name === "All") {
            return []
          }
          else {
            if (allSelected) {
              return prevSelected?.filter((item) => item.name !== "All" && item.name !== option.name)
            }
            else {
              return prevSelected?.filter((item) => item.name !== option.name);
            }
          }
        }
        else if (option.name === "All") {
          return options
        }
        else {
          return [...prevSelected, option];
        }
      }
    );
  };

  const deleteOptions = (item: any, event: any) => {
    if (event && event.stopPropagation) event.stopPropagation();

    const deleted = selectedOptionNames?.filter((e: any) => e !== item);
    const update = selectedOptions?.filter((e: any) => e.name !== item);

    if (item === "All") {
      setSelectedOptionNames([])
      setSelectedOptions([]);
    }
    else {
      if (selectedOptionNames.includes("All")) {
        setSelectedOptionNames((prevSelected: []) => {
          return prevSelected?.filter((itemoption) => itemoption !== "All" && itemoption !== item)
        })
        setSelectedOptions((prevSelected: { code: string; name: string; icon?: string }[]) => {
          return prevSelected?.filter((itemoption) => itemoption.name !== "All" && itemoption.name !== item)
        })
      }
      else {
        setSelectedOptionNames([...deleted]);
        setSelectedOptions([...update]);
      }
    }
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (!dropDownList?.current?.contains(e?.target)) {
        setIsDrop(false);
        if (typeof onOutSideClick === "function") {
          onOutSideClick();
        }
      }
    };
  
    document.addEventListener("mousedown", handler);
  
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  

  return (
    <div className={`relative max-w-full min-w-40 bg-white multiSelectDropdown ${clsName}`} ref={dropDownList}>
      {!!title && <div className="text-sm font-medium flex gap-1 pb-1">
        {title}
        <span className="text-red-500">*</span>
      </div>}
      <div
        className={`bg-white relative text-sm w-full pl-3 pr-5 h-9 font-normal flex justify-between items-center border rounded-md ${error ? "border-status-danger-800" : "border-gray-p-350"
          } ${!openProp && "cursor-not-allowed"} ${showOptionsOnly && "hidden"}`}
        onClick={() => setIsDrop(!isDrop)}
      >
        <div
          className="flex items-center"
        >
          {selectedOptionNames.length === 0 ? (
            <span className="text-sm text-[#A2A2A2] py-1 flex items-center gap-1 ">
              Select {title}
            </span>
          ) : (
            selectedOptionNames?.map((e: any) => (
              <span
                key={e}
                className="flex justify-center items-center gap-2 px-2 text-xs bg-secondary-g-50 rounded-md"
                style={{ paddingTop: "6px", paddingBottom: "6px" }}
              >
                <span className="w-max">{e}</span>
                {openProp && (
                  <span
                    onClick={(event) => deleteOptions(e, event)}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="9"
                      viewBox="0 0 9 9"
                      fill="none"
                    >
                      <path
                        d="M1.35 8.55C1.10147 8.79853 0.698528 8.79853 0.45 8.55C0.201472 8.30147 0.201472 7.89853 0.45 7.65L3.6 4.5L0.45 1.35C0.201471 1.10147 0.201472 0.698528 0.45 0.45C0.698528 0.201472 1.10147 0.201472 1.35 0.45L4.5 3.6L7.65 0.45C7.89853 0.201472 8.30147 0.201472 8.55 0.45C8.79853 0.698528 8.79853 1.10147 8.55 1.35L5.4 4.5L8.55 7.65C8.79853 7.89853 8.79853 8.30147 8.55 8.55C8.30147 8.79853 7.89853 8.79853 7.65 8.55L4.5 5.4L1.35 8.55Z"
                        fill="#333333"
                      />
                    </svg>
                  </span>
                )}
              </span>
            ))
          )}
        </div>
        <span
          className={` cursor-pointer absolute right-0 mr-2 text-inherit ${!openProp && "cursor-not-allowed"
            }`}
        >
          <BiChevronDown
            size={20}
            className={`${isDrop && openProp && "rotate-180"} text-gray-p-450 ${!openProp && "text-gray-200"
              }`}
          />
          
        </span>
      </div>
      {isDrop && openProp && (
        <div className="mt-1 md:mt-12 animate-slide-top-select duration-300 bg-white rounded-lg shadow-filterShadow border border-gray-o-300 px-3 min-w-60 md:min-w-64 overflow-y-auto w-full pb-2 absolute right-0 md:right-auto z-50">
          <div className="sticky top-0 py-2">
            <span className="absolute top-5 right-4 flex gap-1">
              {!showOptionsOnly && searchTerm.length ? <Close onClick={() => setSearchTerm('')} className="w-3 cursor-pointer" /> : null}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  d="M13.9 13L12.64 11.8M7.28505 12.4C8.07101 12.4 8.84928 12.2526 9.57541 11.9661C10.3015 11.6797 10.9613 11.2598 11.5171 10.7305C12.0728 10.2012 12.5137 9.57285 12.8145 8.8813C13.1152 8.18974 13.27 7.44853 13.27 6.7C13.27 5.95147 13.1152 5.21026 12.8145 4.5187C12.5137 3.82715 12.0728 3.19879 11.5171 2.66949C10.9613 2.1402 10.3015 1.72034 9.57541 1.43389C8.84928 1.14743 8.07101 1 7.28505 1C5.69773 1 4.17542 1.60053 3.05301 2.66949C1.93061 3.73845 1.30005 5.18827 1.30005 6.7C1.30005 8.21173 1.93061 9.66155 3.05301 10.7305C4.17542 11.7995 5.69773 12.4 7.28505 12.4Z"
                  stroke="#B8B8B8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              type="input"
              placeholder={showOptionsOnly ? "Filter By" : "Search"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-200 text-xs px-3 text-black-b-300 focus:outline-none focus:ring-0 focus:border-gray-200 focus-visible:shadow-input-ring"
            />

          </div>

          <div className="overflow-y-auto max-h-52">
            {options ? (
              filteredOptions?.map((option) => (
                <label
                  htmlFor={option.code}
                  key={option.code}
                  className="flex gap-2 px-2 py-3 items-center text-xs rounded-md hover:bg-secondary-g-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={option.code}
                    value={option.name}
                    className="rounded cursor-pointer focus:outline-none focus:ring-0 w-4 h-4"
                    checked={selectedOptionNames.includes(option.name)}
                    disabled={option?.isDisabled}
                    onChange={() => {
                      toggleOption(option);
                    }}
                  />
                  {!!option?.icon && (
                    <img
                      className="h-5 w-7"
                      src={option?.icon}
                      alt={`${option?.name}-flag`}
                    />
                  )}{" "}
                  {option.name}
                </label>
              ))
            ) : // <p className="text-center py-2 text-gray-400">Data not found</p>

              isLoader ? (
                <div className="w-full text-center flex justify-center p-2">
                  <div className="loader"></div>
                </div>
              ) : (
                <p className="text-center py-2 text-gray-400">Data not found</p>
              )}
            {Array.isArray(filteredOptions) &&
              filteredOptions?.filter((d) => d?.name?.toLowerCase()?.startsWith(searchTerm))
                ?.length == 0 && (
                <p className="text-center text-sm py-4 text-gray-500">
                  Data not found
                </p>
              )}
          </div>
        </div>
      )}
      {error && (
        <div className="text-status-danger-800 text-left text-xs pl-1">
          {error}
        </div>
      )}
    </div>
  );
};

export { MultiSelectDropDown };