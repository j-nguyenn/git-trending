import { css } from "@emotion/css";
import React from "react";
import { PaginationProps } from "./pagination.interface";

const Pagination = (props: PaginationProps) => {
  const { totalPages } = props;
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageKeys = [...Array(totalPages).keys()].map((i) => i + 1);

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
    if (totalPages <= 5) {
      return <>{pageKeys.map(renderPageItem)}</>;
    }
    const leftPart = pageKeys.slice(0, 3);
    const rightPart = pageKeys.slice(totalPages - 3, totalPages - 1);

    return (
      <>
        {leftPart.map(renderPageItem)}
        <div className="page-item">...</div>
        {rightPart.map(renderPageItem)}
      </>
    );
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