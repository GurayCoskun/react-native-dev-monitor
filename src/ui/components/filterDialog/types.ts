import type { FilterCriteria } from '../../../../core';

export type FilterDialogPropsType = {
  open: boolean;
  initialFilters: FilterCriteria;
  onClose: () => void;
  onApply: (filters: FilterCriteria) => void;
};
