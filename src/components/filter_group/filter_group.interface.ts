export interface FilterGroupProps {
  onFilterLanguage: (lang: string) => void;
  onFilterStaredRepo: () => void;
  onShowAll: () => void;
  onClearCache: () => void;
}
