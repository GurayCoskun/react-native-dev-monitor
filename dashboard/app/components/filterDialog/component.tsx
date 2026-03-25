import {
  type FilterCriteria,
  methodOptions,
  statusOptions,
} from '../../../../src/core';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';

type FilterDialogProps = {
  open: boolean;
  initialFilters: FilterCriteria;
  onClose: () => void;
  onApply: (filters: FilterCriteria) => void;
};

export default function FilterDialog(props: FilterDialogProps) {
  const { open, initialFilters, onClose, onApply } = props;

  const [localFilters, setLocalFilters] =
    useState<FilterCriteria>(initialFilters);

  useEffect(() => {
    if (!open) return;
    setLocalFilters(initialFilters);
  }, [open, initialFilters]);

  const resetFilters = () => {
    setLocalFilters({ status: 'all', method: '' });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Filter logs</DialogTitle>
      <DialogContent>
        <Box className="flex flex-col gap-4 mt-2">
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={localFilters.status}
              label="Status"
              onChange={(event) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  status: event.target.value as FilterCriteria['status'],
                }))
              }
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Method</InputLabel>
            <Select
              value={localFilters.method}
              label="Method"
              onChange={(event) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  method: event.target.value as FilterCriteria['method'],
                }))
              }
            >
              {methodOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button size="small" onClick={resetFilters}>
            Reset filters
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            onApply(localFilters);
            onClose();
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
