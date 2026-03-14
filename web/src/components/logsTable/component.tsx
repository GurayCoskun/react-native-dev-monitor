import React from 'react';
import { formatDuration, getLogColors } from '../../../../src';
import { HourglassEmpty } from '@mui/icons-material';
import { TableSortLabel } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTableService } from '../../hooks/useTableService';
import SearchBar from '../searchBar/component';
import { TableRowContextMenu } from '../tableRowContextMenu/component';
import {
  type LogsTableProps,
  StyledTableCell,
  type TableHeaderCellType,
} from './types';
import { useApiLogs } from '../../hooks/useApiLogsService';

export const LogsTable = (props: LogsTableProps) => {
  const { selectedApiLog, onClickRow } = props;

  const {
    logs,
    searchQuery,
    setSearchQuery,
    clearLogs,
    applyFilters,
    filterCriteria,
    sortKey,
    sortDirection,
    toggleSort,
  } = useApiLogs();

  const { menuPosition, setMenuPosition, contextLog, handleContextMenu } =
    useTableService();

  const tableHeaders: TableHeaderCellType[] = [
    {
      title: 'Request Time',
      sortKey: 'startTime',
    },
    {
      title: 'URL',
      sortKey: 'url',
    },
    {
      title: 'Status',
      sortKey: 'status',
      align: 'right',
    },
    {
      title: 'Method',
      sortKey: 'method',
      align: 'right',
    },
    {
      title: 'Response Time',
      sortKey: 'responseTime',
      align: 'right',
    },
  ];

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '100vh', overflowY: 'auto' }}
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClickDelete={clearLogs}
          filterCriteria={filterCriteria}
          onApplyFilters={applyFilters}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow className="font-bold">
              {tableHeaders.map((item) => (
                <StyledTableCell
                  align={item.align}
                  key={`Table_Header_${item.title}`}
                >
                  <TableSortLabel
                    active={sortKey === item.sortKey}
                    direction={sortKey === item.sortKey ? sortDirection : 'asc'}
                    onClick={() => toggleSort(item.sortKey)}
                  >
                    {item.title}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {logs.map((log) => {
              const { statusColor, responseTimeColor } = getLogColors(log);
              const sxStatus = { color: statusColor };
              const sxResponseTime = { color: responseTimeColor };
              return (
                <TableRow
                  key={log.id}
                  onClick={() => {
                    onClickRow?.(log);
                  }}
                  onContextMenu={(event) => handleContextMenu(event, log)}
                  sx={[
                    {
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    },
                    {
                      'backgroundColor':
                        selectedApiLog?.id === log.id ? '#a1b7ddff' : 'white',
                      'cursor': 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    },
                  ]}
                >
                  <TableCell component="th" scope="row">
                    {new Date(log.startTime).toISOString()}
                  </TableCell>
                  <TableCell>{log.url}</TableCell>
                  <TableCell
                    sx={sxStatus}
                    style={{ fontWeight: 'bold' }}
                    align="right"
                  >
                    {log.status ?? 'Pending'}
                  </TableCell>
                  <TableCell align="right">{log.method}</TableCell>
                  <TableCell align="right" sx={sxResponseTime}>
                    {formatDuration(log)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {logs.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HourglassEmpty fontSize={'large'} />
            <p>Waiting for api calls.</p>
          </div>
        )}
      </TableContainer>
      {contextLog ? (
        <TableRowContextMenu
          log={contextLog}
          menuPosition={menuPosition}
          close={() => setMenuPosition(undefined)}
        />
      ) : null}
    </React.Fragment>
  );
};
