import React from "react";
import { css } from "@emotion/css";
import { FilterGroupProps } from "./filter_group.interface";

const FilterGroup = (props: FilterGroupProps) => {
  const { onClearCache, onShowAll, onFilterStaredRepo } = props;
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
        <button className="link-btn" onClick={onClearCache}>
          Clear cache
        </button>
        <button className="styled-btn" onClick={onShowAll}>
          Show all repo
        </button>
        <button className="styled-btn star-btn" onClick={onFilterStaredRepo}>
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

  .styled-btn {
    border: 0;
    border-radius: 4px;
    padding: 4px 8px;
    margin-right: 4px;
    margin-left: 4px;
    &:hover {
      cursor: pointer;
    }
  }

  .star-btn {
    background: #388bfd;
    text-align: center;
    color: #fff;
  }

  .link-btn {
    border: 0;
    background: transparent;

    &:hover {
      cursor: pointer;
    }
  }
`;

const LANGUAGES = ["JavaScript", "Ruby", "HTML", "CSS", "Typescript", "Java"];
