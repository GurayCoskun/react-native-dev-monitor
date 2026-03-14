import type { NetworkLog } from '../../core';
import * as React from 'react';
import { clearLogs, subscribeLogs } from './store';

const useDevMonitorLogs = () => {
  const [logs, setLogs] = React.useState<NetworkLog[]>([]);
  const [selectedLog, setSelectedLog] = React.useState<NetworkLog | undefined>(
    undefined
  );

  React.useEffect(() => {
    return subscribeLogs(setLogs);
  }, []);

  return { logs, clearLogs, selectedLog, setSelectedLog };
};

export { useDevMonitorLogs };
