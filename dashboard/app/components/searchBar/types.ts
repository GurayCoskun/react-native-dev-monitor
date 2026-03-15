import { type FilterCriteria } from '../../../../core';

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClickDelete: () => void;
  filterCriteria: FilterCriteria;
  onApplyFilters: (filters: FilterCriteria) => void;
};
