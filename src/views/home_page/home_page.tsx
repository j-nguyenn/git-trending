import { css } from "@emotion/css";
import moment from "moment";
import React from "react";
import {
  fetchRepositories,
  getRepositories,
  getTotalPages,
} from "../../actions";
import FilterGroup from "../../components/filter_group/filter_group.component";
import Pagination from "../../components/pagination/pagination.component";
import { RepositoryCardProps } from "../../components/repository_card/repository_card.interface";
import RepositoryList from "../../components/repository_list/repository_list.component";
import SearchInput from "../../components/search_input/search_input.component";

const HomePage = () => {
  const [repoResults, setResults] = React.useState<RepositoryCardProps[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentLang, setCurrentLang] = React.useState("");

  const fetchData = async (
    page: number,
    lang?: string,
    searchQuery?: string
  ) => {
    const fromDate = moment().add(-1, "M").format("YYYY-MM-DD");
    const result = await fetchRepositories(fromDate, page, lang, searchQuery);
    const { items, total_count } = result;
    setTotalPages(Math.floor(total_count / 30));
    setResults(items);
  };

  React.useEffect(() => {
    const cachedResults = getRepositories();
    if (cachedResults?.length) {
      setResults(cachedResults);
      setTotalPages(getTotalPages());
    } else {
      fetchData(1);
    }
  }, []);

  return (
    <div className={homePageStyle()}>
      <div className="header">
        <h1>Git-Trending</h1>
      </div>
      <SearchInput
        onSearch={(value) => {
          fetchData(currentPage, currentLang, value);
        }}
      />
      <FilterGroup
        onFilterLanguage={(lang) => {
          setCurrentLang(lang);
          fetchData(currentPage, lang);
        }}
      />
      <RepositoryList items={repoResults} />
      <Pagination
        totalPages={totalPages}
        onPageChanged={(page) => {
          setCurrentPage(page);
          fetchData(page, currentLang);
        }}
      />
    </div>
  );
};

export default HomePage;

const homePageStyle = () => css`
  label: home-page;
  max-width: 780px;
  margin: auto;
`;
