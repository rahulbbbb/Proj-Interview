import React, { useRef } from "react";
import {  CloseSmallIcon } from "@/components/Icons";
import { SearchIcon2 } from "@/components/Icons"

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCrossClick?: () => void;
}

const SearchBar = ({ value, onChange, handleCrossClick }: SearchBarProps) => {
  //reference for input field
  const inputRef = useRef(null);

  //to clear the input field and set focus
  const handleFocus = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div className="search w-auto">
      <button className="">
        {value && value?.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              if (handleCrossClick) handleCrossClick();
              handleFocus();
            }}
            
            
          >
            <CloseSmallIcon className="w-4" />
          </button>
        ) : (
          <SearchIcon2 />
        )}
      </button>
      <input
        ref={inputRef}
        id="search"
        type="text"
        className="border-none shadow-none focus:outline-none search-input focus:shadow-none ring-0 focus:ring-0 font-normal pr-3"
        placeholder="Search..."
        // value={value}
        // value={value}
        onChange={onChange}
      />
      
    </div>
  );
};

export default SearchBar;

