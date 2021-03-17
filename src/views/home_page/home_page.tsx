import { css } from "@emotion/css";
import moment from "moment"; // date-fns
import React from "react";
import { fetchRepositories, getRepositories } from "../../actions";
import FilterGroup from "../../components/filter_group/filter_group.component";
import Pagination from "../../components/pagination/pagination.component";
import { RepositoryCardProps } from "../../components/repository_card/repository_card.interface";
import RepositoryList from "../../components/repository_list/repository_list.component";
import SearchInput from "../../components/search_input/search_input.component";

const HomePage = () => {
  const [repoResults, setResults] = React.useState<RepositoryCardProps[]>([]);
  const totalPages = React.useRef<number>(1);
  const currentPage = React.useRef<number>(1);
  const currentLang = React.useRef<string>("");
  const didMount = React.useRef<boolean>(false);

  const fetchData = React.useCallback(
    async (page: number, lang?: string, searchQuery?: string) => {
      const fromDate = moment().add(-1, "w").format("YYYY-MM-DD");
      const result = await fetchRepositories(fromDate, page, lang, searchQuery);
      try {
        const { items, total_count } = result;
        totalPages.current = Math.min(Math.floor(total_count / 30), 10);
        setResults(items);
      } catch {
        console.warn("error");
      }
    },
    [repoResults]
  );

  React.useEffect(() => {
    totalPages.current = 10;
    const cachedResults = getRepositories();
    if (cachedResults?.length) {
      setResults(cachedResults);
    } else {
      fetchData(1);
    }
    didMount.current = true;
  }, []);

  const renderMainResult = () => {
    if (didMount.current && !repoResults?.length) {
      return <div>Oops! No result found</div>;
    } else {
      return <RepositoryList items={repoResults} />;
    }
  };
  return (
    <div className={homePageStyle()}>
      <div className="header">
        <h1>Git-Trending</h1>
      </div>
      <SearchInput
        onSearch={(value) => {
          fetchData(currentPage.current, currentLang.current, value);
        }}
      />
      <FilterGroup
        onFilterStaredRepo={() => {
          const mostRecentResults = getRepositories();
          const staredRepos = mostRecentResults.filter(
            (result) => result.rated
          );
          setResults(staredRepos);
        }}
        onFilterLanguage={(lang) => {
          currentLang.current = lang;
          fetchData(currentPage.current, lang);
        }}
      />
      {renderMainResult()}
      <Pagination
        totalPages={totalPages.current}
        onPageChanged={(page) => {
          currentPage.current = page;
          fetchData(page, currentLang.current);
        }}
      />
    </div>
  );
};

export default React.memo(HomePage);

const homePageStyle = () => css`
  label: home-page;
  max-width: 780px;
  margin: auto;
`;
