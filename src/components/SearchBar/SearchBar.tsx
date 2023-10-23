import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search-bar.css";

export type SearchBarProps = {
  onSearchClick: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearchClick }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchButtonClick = () => {
    inputValue !== "" && onSearchClick(inputValue);
    setInputValue("");
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputValue !== "" && onSearchClick(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          type="text"
          placeholder="Enter the name of the city..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={handleEnterKeyPress}
        />
      </div>

      <button className="search-button" onClick={handleSearchButtonClick}>
        <FontAwesomeIcon icon={faSearch} className="icon-search" />
      </button>
    </div>
  );
};

export default SearchBar;
