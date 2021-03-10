import { RepositoryCardProps } from "../components/repository_card/repository_card.interface";

export const fetchRepositories = (
  fromDate: string,
  currentPage: number,
  lang?: string,
  searchQuery?: string
): Promise<{ total_count: number; items: RepositoryCardProps[] }> => {
  let query = `q=created:>${fromDate}`;
  if (lang) {
    query += `+language:${lang.toLowerCase()}`;
  }
  if (searchQuery) {
    query += searchQuery;
  }
  const url = `https://api.github.com/search/repositories?${query}&sort=stars&order=desc&page=${currentPage}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        resolve(result);
        setRepositories(result?.items);
        setTotalPages(result?.total_count);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setTotalPages = (totalPages: number): void => {
  localStorage.setItem("totalPages", String(totalPages));
};

export const getTotalPages = (): number => {
  const pages = localStorage.getItem("totalPages") ?? "";
  return JSON.parse(pages);
};

export const setRepositories = (repositories: RepositoryCardProps[]): void => {
  if (repositories) {
    localStorage.setItem("repositories", JSON.stringify(repositories));
  }
};

export const getRepositories = (): RepositoryCardProps[] => {
  const results = localStorage.getItem("repositories") ?? "[]";
  return JSON.parse(results);
};

export const toggleStar = (id: string): void => {
  const repositoryList = getRepositories();
  const selectedRepository = repositoryList.find((item) => item.id === id);
  if (selectedRepository) {
    if (selectedRepository.rated) {
      selectedRepository.stargazers_count -= 1;
      selectedRepository.rated = false;
    } else {
      selectedRepository.stargazers_count += 1;
      selectedRepository.rated = true;
    }
  }

  setRepositories(repositoryList);
};
