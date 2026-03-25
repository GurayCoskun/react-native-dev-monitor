'use client';

import { useState } from 'react';
import { Grid } from '@mui/material';
import { Sidebar } from './components/sidebar/component';
import { type NetworkLog } from '../../src/core';
import { LogsTable } from './components/logsTable/component';

export default function Home() {
  const [selectedApiLog, setSelectedApiLog] = useState<NetworkLog | undefined>(
    undefined
  );

  return (
    <div className="bg-[#33313B] h-screen p-4 font-sans box-border overflow-hidden flex flex-col relative">
      <h1 className="text-2xl font-bold mb-2 text-white">
        React Native Dev Monitor
      </h1>
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
          onClick={() => setSelectedApiLog(undefined)}
        >
          <div
            className="absolute top-0 right-0 h-full w-full max-w-2xl bg-slate-900 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Sidebar
              apilog={selectedApiLog}
              onClose={() => setSelectedApiLog(undefined)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
