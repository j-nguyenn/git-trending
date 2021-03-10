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
      <div>
        <small>Languages: </small>
      </div>
      {renderLanguageOptions()}
    </div>
  );
};

export default FilterGroup;

const filterGroupStyle = () => css`
  label: filter-group;
  display: flex;
  padding-top: 12px;
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
`;

const LANGUAGES = ["JavaScript", "Ruby", "HTML", "CSS", "Typescript", "Java"];
