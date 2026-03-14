'use client';

import { type NetworkLog } from '../../../src';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { LogsTable } from '../components/logsTable/component';
import { Sidebar } from '../components/sidebar/component';

export default function Dashboard() {
  const [selectedApiLog, setSelectedApiLog] = useState<NetworkLog | null>(null);

  return (
    <div className="bg-[#33313B] h-screen p-4 font-sans box-border overflow-hidden flex flex-col relative">
      <h1 className="text-2xl font-bold mb-2 text-white">Dev Monitoring</h1>
      <Grid
        sx={{ mt: 2, flex: 1, minHeight: 0, overflow: 'hidden' }}
        container
        spacing={2}
      >
        <LogsTable
          onClickRow={setSelectedApiLog}
          selectedApiLog={selectedApiLog}
        />
      </Grid>
      {selectedApiLog && (
        <div
          className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedApiLog(null)}
        >
          <div
            className="absolute top-0 right-0 h-full w-full max-w-2xl bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Sidebar
              apilog={selectedApiLog}
              onClose={() => setSelectedApiLog(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
