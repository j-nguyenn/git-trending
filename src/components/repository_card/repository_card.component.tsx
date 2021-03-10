import { css } from "@emotion/css";
import moment from "moment";
import React from "react";
import { toggleStar } from "../../actions";
import { RepositoryCardProps } from "./repository_card.interface";

const RepositoryCard = (props: RepositoryCardProps) => {
  const {
    id,
    html_url,
    description,
    stargazers_count,
    full_name,
    language,
    updated_at,
    rated,
  } = props;
  const [star, setStar] = React.useState(rated ? 1 : 0);

  const onStarClick = () => {
    toggleStar(id);
    setStar(star ? 0 : 1);
  };

  return (
    <div className={repositoryCardStyle()}>
      <div className="repo-left">
        <div className="repo-star" onClick={onStarClick}>
          <div className="repo-star-number">{stargazers_count + star}</div>
          <span>{stargazers_count + star > 1 ? "stars" : "star"}</span>
        </div>
        <div className="repo-main">
          <a href={html_url}>{full_name}</a>
          <div>{description}</div>
          <small>Updated at: {moment(updated_at).format("DD MMM YYYY")}</small>
        </div>
      </div>

      <div className="repo-outro">
        <div>{language}</div>
      </div>
    </div>
  );
};

export default RepositoryCard;

const repositoryCardStyle = () => css`
  label: repository-card;
  display: flex;
  border-radius: 5px;
  border: 1px solid rgb(232, 232, 232);
  padding: 6px;
  margin: 15px 0;
  flex: 1;
  justify-content: space-between;
  text-align: left;
  font-size: 13px;
  .repo-left {
    display: flex;
    flex-basis: 90%;
  }
  .repo-outro {
    flex-basis: 10%;
  }
  .repo-star {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 10%;
    .repo-star-number {
      font-size: 22px;
    }
    &:hover {
      cursor: pointer;
      color: #388bfd;
    }
  }
  .repo-main {
    padding-left: 8px;
    max-width: 86%;
    max-height: 51px;
    overflow: hidden;
  }
`;
