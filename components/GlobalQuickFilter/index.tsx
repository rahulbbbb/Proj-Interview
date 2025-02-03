import { useEffect, useState } from "react";
import { MultiSelectDropDown } from "../MultiSelectDropdown";
import { MdClose } from "react-icons/md";
import { BiPlus } from "react-icons/bi";

interface quickFilterSelectedType {
  id?: string;
  name?: string;
}
interface Option {
  name: string;
  code: string;
}

const GlobalQuickFilter = ({
  filters,
  isLeft,
  onClickQuickFilter,
  quickFilterSelected,
  initialLengthOfQuickFilter = 2,
}: {
  filters: Array<{ id: string; name: string }>;
  onClickQuickFilter?: (value: object) => void;
  quickFilterSelected: quickFilterSelectedType;
  isLeft?: boolean;
  initialLengthOfQuickFilter?: number;
}) => {
  const [u_filter, setU_filter] = useState(
    filters?.slice(0, initialLengthOfQuickFilter)
  );

  const [showMenuPopover, setshowMenuPopover] = useState(false);

  const handleClickClear = (id: string) => {
    setU_filter((prevState) => [...prevState].filter((p) => p?.id != id));
  };

  useEffect(() => {
    if (
      quickFilterSelected?.name?.toLocaleLowerCase() !== "all" &&
      !u_filter.some((x) => x?.name === quickFilterSelected?.name)
    ) {
      if (typeof onClickQuickFilter === "function") {
        onClickQuickFilter({
          id: "",
          name: "All",
        });
      }
    }
  }, [u_filter]);
  

  return (
    <label
      className={`filterWrap flex items-center h-10 ${
        isLeft ? "mr-auto" : "mr-3"
      }`}
    >
      <span className="flex justify-between gap-3">
        {[{ id: "", name: "All" }, ...u_filter].map((filterObj) => (
          <button
            key={filterObj?.name}
            className={`paddingYQuickFilter relative tracking-wide rounded-full text-xs justify-between font-normal flex items-center 
              ${
                filterObj.name ==
                (typeof quickFilterSelected !== undefined &&
                  quickFilterSelected?.name)
                  ? "bg-primary-o-370 text-white"
                  : "bg-gray-o-150 text-black-b-300"
              } ${filterObj?.name != "All" ? "pl-2 pr-4" : "px-2"}`}
          >
            <span
              className="pt-0.5 mx-1 mr-2"
              onClick={() => {
                if (typeof onClickQuickFilter === "function") {
                  onClickQuickFilter(filterObj);
                }
              }}
              
            >
              {filterObj?.name}
            </span>
            {filterObj?.name != "All" && (
              <div
                className="group px-1 absolute flex items-center rounded-tr-full rounded-br-full h-full hover:bg-black hover:bg-opacity-10 right-0 mr-[3px]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickClear(filterObj?.id);
                }}
              >
                <MdClose />
              </div>
            )}
          </button>
        ))}

        <div className="md:relative">
          <button
            className="bg-gray-o-150 hover:bg-gray-o-300 transition-all flex h-7 w-7 px-1 rounded-full items-center justify-center"
            onClick={() => setshowMenuPopover(true)}
          >
            <BiPlus className="text-gray-900 w-6 h-6" />
          </button>

          {!!showMenuPopover && (
            <div className="absolute z-40 mt-10 right-0">
              <MultiSelectDropDown
                options={filters?.map((f) => ({
                  name: f?.name,
                  code: f?.id,
                  isDisabled:
                    u_filter.length >= initialLengthOfQuickFilter &&
                    !u_filter.some((x) => x.id === f.id),
                }))}
                selectedValue={(v: any) => {
                  const newArr = [...v]?.map((v) => ({
                    name: v?.name,
                    id: v?.code,
                  }));
                  setU_filter(newArr);
                }}
                name={u_filter?.map((f) => f?.name)}
                valueObj={u_filter?.map((f) => ({
                  name: f?.name,
                  code: f?.id,
                }))}
                showOptionsOnly
                onOutSideClick={() => setshowMenuPopover(false)}
              />
            </div>
          )}
        </div>
      </span>
    </label>
  );
};

export default GlobalQuickFilter;
