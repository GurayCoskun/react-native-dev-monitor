import { type NetworkLog } from '../../../../src/core';
import styled from 'styled-components';
import TableCell, {
  tableCellClasses,
  type TableCellProps,
} from '@mui/material/TableCell';
import { type SortKey } from '../../hooks/useApiLogsService';

type TableHeaderCellType = {
  title: string;
  sortKey: SortKey;
  align?: TableCellProps['align'];
};

type LogsTableProps = {
  onClickRow?: (log: NetworkLog) => void;
  selectedApiLog?: NetworkLog;
};

const StyledTableCell = styled(TableCell)(() => {
  return {
    [`&.${tableCellClasses.head}`]: {
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {},
  };
});

export { type LogsTableProps, type TableHeaderCellType, StyledTableCell };
