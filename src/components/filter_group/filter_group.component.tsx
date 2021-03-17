import React from "react";
import { css } from "@emotion/css";
import { FilterGroupProps } from "./filter_group.interface";

const FilterGroup = (props: FilterGroupProps) => {
  const [selectedLang, setSelectedLang] = React.useState<string>();

  const renderLanguageOptions = () => {
    return (
      <div className="languages-list">
        <div
          className={`language-item ${!selectedLang && "selected"}`}
          onClick={() => {
            props.onFilterLanguage("");
            setSelectedLang(undefined);
          }}
        >
          Any
        </div>
        {LANGUAGES.map((lang, index) => {
          return (
            <div
              className={`language-item ${
                selectedLang === lang ? "selected" : ""
              } `}
              key={index}
              onClick={() => {
                props.onFilterLanguage(lang);
                setSelectedLang(lang);
              }}
            >
              {lang}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={filterGroupStyle()}>
      <div className="section">
        <small>Languages: </small>
        {renderLanguageOptions()}
      </div>
      <div className="section end">
        <button
          className="star-button"
          onClick={() => props.onFilterStaredRepo()}
        >
          <i className="fa fa-star"></i>
          Stared repo
        </button>
      </div>
    </div>
  );
};

export default FilterGroup;

const filterGroupStyle = () => css`
  label: filter-group;
  display: flex;
  padding-top: 12px;
  flex-direction: column;
  .languages-list {
    padding-left: 4px;
    display: flex;
    .language-item {
      padding: 2px 8px;
      &: hover {
        cursor: pointer;
        background: rgba(27, 31, 35, 0.05);
      }
    }
    .selected {
      background: rgba(27, 31, 35, 0.08);
    }
  }
  .section {
    padding-top: 5px;
    display: flex;
  }
  .end {
    justify-content: flex-end;
  }
  .star-button {
    background: #388bfd;
    text-align: center;
    color: #fff;
    cursor: pointer;
    border: 0;
    border-radius: 5px;
  }
`;

const LANGUAGES = ["JavaScript", "Ruby", "HTML", "CSS", "Typescript", "Java"];
