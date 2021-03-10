import { css } from "@emotion/css";
import React from "react";
import RepositoryCard from "../repository_card/repository_card.component";
import { RepositoryListProps } from "./repository_list.interface";

const RepositoryList = (props: RepositoryListProps) => {
  const { items } = props;

  return (
    <div className={repositoryListStyle()}>
      {items.map((item, index) => (
        <RepositoryCard key={index} {...item} />
      ))}
    </div>
  );
};

export default RepositoryList;

const repositoryListStyle = () => css`
  label: repository-list;
`;
