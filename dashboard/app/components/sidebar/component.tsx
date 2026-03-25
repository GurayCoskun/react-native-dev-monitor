import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getQueryParams } from '../../../../src/core';
import { JsonEditor } from '../jsonEditor/component';
import { type SidebarProps } from './types';

export const Sidebar = (props: SidebarProps) => {
  const { apilog, onClose } = props;

  const queryParams = getQueryParams(apilog.url!);

  return (
    <Paper
      className="p-[16px]"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 750,
        height: '100vh',
        backgroundColor: '#1d2534',
        color: '#fff',
        overflowY: 'auto',
        zIndex: 2,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">API Log</h2>
        <button
          type="button"
          className="text-sm underline"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          Close
        </button>
      </div>

      <Accordion disableGutters defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Request Information
        </AccordionSummary>
        <AccordionDetails>
          <pre className="text-xs whitespace-pre-wrap break-all">
            <p>
              <strong>URL:</strong> {apilog.url ?? '-'}
            </p>
            <p>
              <strong>Method:</strong> {apilog.method ?? '-'}
            </p>
            <p>
              <strong>Time:</strong> {apilog.startTime ?? '-'}
            </p>
            <p>
              <strong>Status:</strong> {apilog.status ?? '-'}
            </p>
          </pre>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Request Query
        </AccordionSummary>
        <AccordionDetails>
          <JsonEditor value={queryParams} />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Request Header
        </AccordionSummary>
        <AccordionDetails>
          <JsonEditor value={apilog.requestHeaders} />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Request Body
        </AccordionSummary>
        <AccordionDetails>
          <JsonEditor value={apilog.requestBody} />
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Response Header
        </AccordionSummary>
        <AccordionDetails>
          <JsonEditor value={apilog.responseHeaders} />
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Response
        </AccordionSummary>
        <AccordionDetails>
          <JsonEditor value={apilog.responseBody} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
