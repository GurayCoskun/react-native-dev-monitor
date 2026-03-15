import { buildCurlCommand, stringifyValue } from '../../../../core';
import { type TableRowContextMenuType } from './types';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

export const TableRowContextMenu = (props: TableRowContextMenuType) => {
  const { log, menuPosition, close } = props;

  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const copyToClipboard = async (value: string, message: string) => {
    await (navigator as any).clipboard.writeText(value);
    setSnackbarMessage(message);
    close();
  };

  const actions = [
    {
      title: 'Copy as cURL',
      onClick: () =>
        copyToClipboard(buildCurlCommand(log), 'cURL copied to clipboard'),
    },
    {
      title: 'Copy URL',
      onClick: () =>
        copyToClipboard(String(log?.url ?? ''), 'URL copied to clipboard'),
    },
    {
      title: 'Copy Request Body',
      onClick: () =>
        copyToClipboard(
          stringifyValue(log?.requestBody),
          'Request body copied to clipboard'
        ),
    },
    {
      title: 'Copy Response',
      onClick: () =>
        copyToClipboard(
          stringifyValue(log?.responseBody),
          'Response copied to clipboard'
        ),
    },
  ];

  return (
    <React.Fragment>
      <Menu
        open={menuPosition !== null}
        onClose={close}
        anchorReference="anchorPosition"
        anchorPosition={
          menuPosition
            ? { top: menuPosition?.mouseY, left: menuPosition?.mouseX }
            : undefined
        }
      >
        {actions.map((item) => (
          <MenuItem
            key={`Actions_Table_Row_${item.title}`}
            onClick={item.onClick}
            disabled={!log}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={1800}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </React.Fragment>
  );
};
