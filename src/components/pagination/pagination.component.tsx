import { css } from "@emotion/css";
import React from "react";
import { PaginationProps } from "./pagination.interface";

const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageKeys = [...Array(10).keys()].map((i) => i + 1);

  const renderPageItem = (item: number) => {
    return (
      <div
        key={item}
        className={`page-item ${currentPage === item ? "selected" : ""}`}
        onClick={() => {
          setCurrentPage(item);
          props.onPageChanged(item);
        }}
      >
        {item}
      </div>
    );
  };
  const renderPagination = () => {
    return <>{pageKeys.map(renderPageItem)}</>;
  };
  return <div className={PaginationStyle()}>{renderPagination()}</div>;
};

export default Pagination;

const PaginationStyle = () => css`
  label: pagination-card;
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  .selected {
    background: rgba(27, 31, 35, 0.08);
  }
  .page-item {
    padding: 0 5px;
    &:hover {
      cursor: pointer;
      background: rgba(27, 31, 35, 0.05);
    }
  }
`;
