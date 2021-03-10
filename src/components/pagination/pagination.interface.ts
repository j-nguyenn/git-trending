export interface PaginationProps {
  totalPages: number;
  onPageChanged: (page: number) => void;
}
