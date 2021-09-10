import { css } from "@emotion/css";
import moment from "moment"; // date-fns
import React, { useCallback } from "react";
import {
  fetchRepositories,
  setRepositories,
  getRepositories,
} from "../../actions";
import FilterGroup from "../../components/filter_group/filter_group.component";
import Pagination from "../../components/pagination/pagination.component";
import { RepositoryCardProps } from "../../components/repository_card/repository_card.interface";
import RepositoryList from "../../components/repository_list/repository_list.component";
import SearchInput from "../../components/search_input/search_input.component";
import RepoContextProvider from "../../components/context";

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
    []
  );

  React.useEffect(() => {
    totalPages.current = 10;
    if (!didMount.current) {
      fetchData(1);
    }
    didMount.current = true;
  }, []);

  const onClearCache = () => {
    localStorage.clear();
    fetchData(1);
  };

  const renderMainResult = () => {
    if (didMount.current && !repoResults?.length) {
      return <div>Oops! No result found</div>;
    } else {
      return <RepositoryList items={repoResults} />;
    }
  };

  const onToggleStar = useCallback(
    (id: string) => {
      const index = repoResults.findIndex((item) => item.id === id);

      if (index !== -1) {
        if (repoResults[index].rated) {
          repoResults[index].stargazers_count -= 1;
          repoResults[index].rated = false;
        } else {
          repoResults[index].stargazers_count += 1;
          repoResults[index].rated = true;
        }
      }
      setResults((state) => {
        return [...state];
      });
      setRepositories(repoResults);
    },
    [repoResults]
  );

  return (
    <div className={homePageStyle()}>
      <div className="header">
        <h1>Git-Trending</h1>
      </div>
      <RepoContextProvider.Provider
        value={{ repoResults, toggleStar: onToggleStar }}
      >
        <SearchInput
          onSearch={(value) => {
            fetchData(currentPage.current, currentLang.current, value);
          }}
        />
        <FilterGroup
          onFilterStaredRepo={() => {
            const staredRepos = repoResults.filter((result) => result.rated);
            setResults(staredRepos);
          }}
          onFilterLanguage={(lang) => {
            currentLang.current = lang;
            fetchData(currentPage.current, lang);
          }}
          onShowAll={() => {
            setResults(getRepositories());
          }}
          onClearCache={onClearCache}
        />
        {renderMainResult()}
        <Pagination
          totalPages={totalPages.current}
          onPageChanged={(page) => {
            currentPage.current = page;
            fetchData(page, currentLang.current);
          }}
        />
      </RepoContextProvider.Provider>
    </div>
  );
};

export default React.memo(HomePage);

const homePageStyle = () => css`
  label: home-page;
  max-width: 780px;
  margin: auto;
`;
