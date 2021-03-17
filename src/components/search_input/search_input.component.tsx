import { css } from "@emotion/css";
import React from "react";
import { SearchInputProps } from "./search_input.interface";

const SearchInput = (props: SearchInputProps) => {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <div className={searchInputStyle()}>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="search-term"
            placeholder="Search ..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                props.onSearch(searchValue);
              }
            }}
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <button
            type="submit"
            className="searchButton"
            onClick={() => props.onSearch(searchValue)}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;

const searchInputStyle = () => css`
  label: search-input;

  .search {
    width: 100%;
    display: flex;
  }

  .search-term {
    width: 100%;
    border: 3px solid #388bfd;
    border-right: none;
    padding: 5px;
    height: 20px;
    border-radius: 5px 0 0 5px;
    outline: none;
    &:focus {
      color: #388bfd;
    }
  }

  .searchButton {
    width: 40px;
    height: 36px;
    border: 1px solid #388bfd;
    background: #388bfd;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 20px;
  }
`;
