import { type FilterCriteria } from '../../../../src/core';

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClickDelete: () => void;
  filterCriteria: FilterCriteria;
  onApplyFilters: (filters: FilterCriteria) => void;
};
