import { Close, Delete, FilterList } from '@mui/icons-material';
import { Badge, IconButton, Input, InputAdornment } from '@mui/material';
import { useState } from 'react';
import type { SearchBarProps } from './types';
import FilterDialog from '../filterDialog/component';
import React from 'react';

export default function SearchBar(props: SearchBarProps) {
  const { value, onChange, onClickDelete, filterCriteria, onApplyFilters } =
    props;

  const [open, setOpen] = useState(false);
  const isFilterApplied =
    filterCriteria.status !== 'all' || filterCriteria.method !== '';

  return (
    <React.Fragment>
      <div className="flex p-2 bg-[#f5f5f5] gap-2">
        <Input
          fullWidth
          size="small"
          value={value}
          onChange={(event: any) => onChange(event.target.value)}
          placeholder="Type to filter log URLs..."
          endAdornment={
            value ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="clear search"
                  onClick={() => onChange('')}
                >
                  <Close fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
          }
        />
        <div className="flex gap-2">
          <Badge
            variant="dot"
            color="error"
            overlap="circular"
            invisible={!isFilterApplied}
          >
            <IconButton
              size="small"
              onClick={() => setOpen(true)}
              aria-label="filters"
              className="border-2 border-slate-200 hover:border-red-500 bg-transparent hover:bg-red-50 text-slate-500 p-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 group flex items-center justify-center"
            >
              <FilterList />
            </IconButton>
          </Badge>
          <IconButton
            className="border-2 border-slate-200 hover:border-red-500 bg-transparent hover:bg-red-50 text-slate-500 hover:text-red-600 p-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 group flex items-center justify-center"
            onClick={onClickDelete}
          >
            <Delete className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </IconButton>
        </div>
      </div>

      <FilterDialog
        open={open}
        initialFilters={filterCriteria}
        onClose={() => setOpen(false)}
        onApply={onApplyFilters}
      />
    </React.Fragment>
  );
}
