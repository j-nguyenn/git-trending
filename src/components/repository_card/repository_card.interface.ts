export interface RepositoryCardProps {
  id: string;
  html_url: string;
  description: string;
  owner: Owner;
  stargazers_count: number;
  name: string;
  full_name: string;
  language: string;
  languages_url: string;
  updated_at: string;
  rated?: boolean;
}

export interface Owner {
  login: string;
  avatar_url: string;
}
