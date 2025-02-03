import React, { useRef, useState, useEffect } from "react";
import Slider from "rc-slider";
import { Accordion } from "../Accordian";
import clsx from "clsx";
import { SearchIcon } from "@/components/Icons";
import { Button } from "../Button/Button";

interface AccordionComponentProps {
  title: string;
  apiData: any;
  setState: any;
  state: any;
  filterData: any;
  setFilterChanged: any;
}

const AccordionComponent = ({
  title,
  apiData,
  setState,
  state,
  filterData,
  setFilterChanged,
}: AccordionComponentProps) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const [rotate, setRotate] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  const contentSpace = useRef<any>(null);

  useEffect(() => {
    if (contentSpace.current) {
      setHeight(active ? contentSpace?.current?.scrollHeight : 0);
    }
  }, [active]);

  const toggleAccordion = () => {
    setActive((prevActive) => !prevActive);
    setRotate((prevRotate) =>
      prevRotate.includes("rotate-180")
        ? "transform duration-700 ease "
        : "transform duration-700 ease rotate-180"
    );
  };

  const handleSearchBar = () => {
    setSearchBar(true);
  };

  useEffect(() => {
    setActive(false);
    setHeight(0);
    setRotate("rotate-180");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    setFilterChanged(true);

    if (e.target.checked) {
      if (!state.hasOwnProperty(title)) {
        setState((pState: any) => {
          return { ...pState, [title]: [data?.uniqueId] };
        });
      } else if (state.hasOwnProperty(title)) {
        setState((pState: any) => ({
          ...pState,
          [title]: [...pState?.[title], data.uniqueId],
        }));
      }
    } else {
      const index = state?.[title]?.findIndex((e: any) => e === data?.uniqueId);
      const arrCopy = [...state[title]];
      arrCopy.splice(index, 1);
      setState((pState: any) => ({ ...pState, [title]: arrCopy }));
    }
  };

  const filteredApiData = apiData?.filter((data: any) =>
    data?.name?.toLowerCase()?.startsWith(searchText.toLowerCase())
  );

  return (
    <div className="border-b border-gray-100">
      <div className="">
        {!searchBar ? (
          <div className="flex items-center justify-between ">
            <button
              className="py-2 box-border rounded-lg cursor-pointer focus:outline-none flex items-center justify-between"
              onClick={toggleAccordion}
            >
              <span className={`${rotate} inline-block text-gray-400 mr-2`}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="vuesax/linear/arrow-down">
                    <g id="arrow-down">
                      <path
                        id="Vector"
                        d="M13.28 5.9668L8.9333 10.3135C8.41997 10.8268 7.57997 10.8268 7.06664 10.3135L2.71997 5.9668"
                        stroke="#1C2033"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                </svg>
              </span>

              <p
                className="text-sm font-medium "
                // style={{color:"rgba(28, 32, 51, 1)"}}
                style={{
                  color:
                    apiData?.name === "Active"
                      ? "green"
                      : apiData?.name === "Inactive"
                      ? "gray"
                      : "rgba(28, 32, 51, 1)",
                }}
              >
                {title}
              </p>
            </button>

            {active && (
              <span onClick={handleSearchBar} className="cursor-pointer mx-4">
                <svg
                  className="block h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" className=""></circle>
                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                    className=""
                  ></line>
                </svg>
              </span>
            )}
          </div>
        ) : (
          <div className="relative mb-2 mt-2 w-full flex items-center rounded-md">
            <input
              type="text"
              autoFocus
              name="search"
              autoComplete="off"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-9 text-sm w-full relative cursor-text rounded-md border border-gray-200 px-7 shadow-sm outline-none focus:outline-none focus:ring-0 focus:border-gray-200"
              placeholder={`Search ${title}`}
            />
            <span
              onClick={() => {
                setSearchBar(false);
                setSearchText("");
              }}
              className="absolute -right-2 top-2 cursor-pointer"
            >
              <svg
                className="absolute right-3 block h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </span>
          </div>
        )}
      </div>

      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}px` }}
        className="overflow-hidden transition-max-height duration-700 ease-in-out"
      >
        <div className="mt-2 max-h-20 overflow-y-scroll">
          {filteredApiData?.map((data: any, index: number) => (
            <div className="flex flex-col mb-3" key={data.uniqueId}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={data.uniqueId}
                  key={index}
                  className="h-4 w-4"
                  onChange={(e) => handleChange(e, data)}
                  defaultChecked={
                    filterData?.data[title]?.includes(data.uniqueId) ||
                    state[title]?.includes(data.uniqueId)
                      ? true
                      : false
                  }
                />
                <label
                  htmlFor={data.uniqueId}
                  className={`text-xs font-medium ml-2 ${
                    data.name === "Active"
                      ? "text-xs text-green-800 font-medium rounded-full bg-green-100 px-3 py-1"
                      : data.name === "Inactive"
                      ? "text-xs text-gray-500 bg-gray-300 font-medium rounded-full px-3 py-1"
                      : data?.name?.toLowerCase() === "failed"
                      ? "text-xs text-status-danger-300 bg-status-danger-10 font-medium rounded-full px-3 py-1"
                      : data?.name?.toLowerCase() === "success"
                      ? "text-xs text-status-success-300 bg-status-success-100 font-medium rounded-full px-3 py-1"
                      : ""
                  }`}
                >
                  {data.name}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface Filter {
  data: any;
  hideModal: any;
  filterData?: any;
  onFilterReset?: any;
  onFilterApply?: any;
  sliderProps?: {
    min?: number;
    max?: number;
  };
  date?: {
    start?: string;
    end?: string;
  };
  rangefilterName?: string;
  showDateFilter?: boolean;
  showSliderFilter?: boolean;
  showDateFilterName?: string;
  secondaryDate?: {
    start?: string;
    end?: string;
  };
  showSecondaryDateFilterName?: string;
  showSecondaryFilter?: boolean;
}

export const Filter = ({
  data = [],
  hideModal,
  filterData,
  onFilterReset,
  onFilterApply,
  sliderProps,
  showDateFilterName,
  rangefilterName,
  date,
  showDateFilter,
  showSliderFilter,
  secondaryDate,
  showSecondaryDateFilterName,
  showSecondaryFilter,
}: Filter) => {
  const [state, setState] = useState({ ...filterData?.data });

  const [filterChanged, setFilterChanged] = useState(false);

  const [sliderValue, setSliderValue] = useState<number[]>([
    sliderProps?.min ?? 0,
    sliderProps?.max ?? 0,
  ]);

  const [startDate, setStartDate] = useState(date?.start ?? "");

  const [endDate, setEndDate] = useState(date?.end ?? "");

  const [secondaryStartDate, setsecondaryStartDate] = useState(
    secondaryDate?.start ?? ""
  );
  const [secondaryEndDate, setsecondaryEndDate] = useState(
    secondaryDate?.end ?? ""
  );

  function handleSliderChange(value: number[]) {
    setFilterChanged(true);
    setSliderValue(value);
  }

  const resetAll = () => {
    if (typeof onFilterReset === "function") {
      onFilterReset({
        data: {},
        date: { startDate: "", endDate: "" },
        secondaryDate: {
          startDate: "",
          endDate: "",
        },
        amountRange: [],
      });
    }
    setState({});
    hideModal();
  };
  

  return (
    <>
      {(data.length > 0 || showDateFilter || showSliderFilter) && (
        <div
          className={`bg-white rounded-lg shadow-filterShadowNew absolute right-3 z-30 max-w-56 w-full`}
        >
          <div className="flex flex-col">
            <div className="rounded-t-lg flex justify-between px-4 py-3 w-full bg-gray-o-100">
              <span className="text-black-b-300 font-medium">Filters</span>
              <div className="cursor-pointer flex items-center ">
                {/* Close Icon */}
                <span onClick={hideModal}>
                  <svg
                    className="block h-4 w-4 text-black-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-full overflow-y-auto max-h-80 h-full px-5 py-3">
              {data.map((e: any) => (
                <AccordionComponent
                  key={e.title}
                  title={e.title}
                  apiData={e.data}
                  state={state}
                  setFilterChanged={setFilterChanged}
                  setState={setState}
                  filterData={filterData}
                />
              ))}
              <Accordion
                title={`${rangefilterName}`}
                className={clsx(!showSliderFilter && "hidden")}
              >
                <div className="px-2">
                  <Slider
                    min={0}
                    max={10_000}
                    onChange={(number) =>
                      handleSliderChange(number as number[])
                    }
                    value={sliderValue}
                    range
                    classNames={{
                      track: "!bg-primary-o-550 !h-[10px]",
                      handle: "!bg-primary-o-550",
                      rail: "!bg-secondary-g-100 !h-[10px]",
                    }}
                  />

                  <div className="flex items-center justify-center mt-3 gap-4">
                    <div className="relative">
                      <p className="text-[#8B8B8B] absolute left-0 top-1/2 -translate-y-1/2 text-base ml-1">
                        $
                      </p>
                      <input
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const numericValue = Number(inputValue);

                          if (!isNaN(numericValue) && numericValue <= 10_000) {
                            handleSliderChange([
                              Number(numericValue),
                              sliderValue[1],
                            ]);
                          }
                        }}
                        value={sliderValue[0]}
                        min={0}
                        autoComplete="off"
                        max={10000}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-[15px] w-16 rounded-md"
                        type="number"
                      />
                    </div>
                    <div className="relative">
                      <p className="text-[#8B8B8B] absolute left-0 top-1/2 -translate-y-1/2 text-base ml-1">
                        $
                      </p>
                      <input
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const numericValue = Number(inputValue);

                          if (!isNaN(numericValue) && numericValue <= 10_000) {
                            handleSliderChange([
                              sliderValue[0],
                              Number(numericValue),
                            ]);
                          }
                        }}
                        value={sliderValue[1]}
                        min={0}
                        autoComplete="off"
                        max={10000}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-[15px] w-16 rounded-md"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </Accordion>
              <Accordion
                title={`${showDateFilterName}`}
                className={clsx(!showDateFilter && "hidden")}
              >
                <div className="px-2">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col w-full">
                      <label className="text-sm font-medium mb-0.5">
                        Start Date
                      </label>
                      <input
                        autoComplete="off"
                        value={startDate}
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full rounded-xl uppercase"
                        onChange={(e) => {
                          setFilterChanged(true);
                          setStartDate(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="text-sm font-medium mb-0.5">
                        End Date
                      </label>
                      <input
                        autoComplete="off"
                        value={endDate}
                        type="date"
                        min={startDate}
                        disabled={!startDate}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full rounded-xl uppercase"
                        onChange={(e) => {
                          setFilterChanged(true);
                          setEndDate(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Accordion>

              {/* secondary date field */}
              <Accordion
                title={`${showSecondaryDateFilterName}`}
                className={clsx(!showSecondaryFilter && "hidden")}
              >
                <div className="px-2 flex flex-col">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-0.5">
                      Start Date
                    </label>
                    <input
                      autoComplete="off"
                      value={secondaryStartDate}
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full rounded-xl uppercase"
                      onChange={(e) => {
                        setFilterChanged(true);
                        setsecondaryStartDate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-0.5">
                      End Date
                    </label>
                    <input
                      autoComplete="off"
                      value={secondaryEndDate}
                      type="date"
                      min={secondaryStartDate}
                      disabled={!secondaryStartDate}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full rounded-xl uppercase"
                      onChange={(e) => {
                        setFilterChanged(true);
                        setsecondaryEndDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
          <div className="py-3 grid grid-cols-2 items-center justify-center px-4 gap-3 md:gap-4 bg-white rounded-b-lg ">
            <Button
              variant="default"
              disabled={!filterChanged}
              onClick={() => {
                if (typeof onFilterApply === "function") {
                  onFilterApply({
                    data: state,
                    date: { startDate, endDate },
                    secondaryDate: {
                      secondaryStartDate,
                      secondaryEndDate,
                    },
                    amountRange: sliderValue,
                  });
                }
                hideModal();
              }}
              
            >
              Apply
            </Button>
            <Button
              variant="secondary"
              onClick={resetAll}
              className="bg-[#F2F2F2] text-[#A2A2A2] border border-gray-o-300"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
