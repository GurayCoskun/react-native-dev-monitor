import {
  type FilterCriteria,
  type NetworkLog,
  SOCKET_EVENTS,
} from '../../../core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
});

type SortKey = 'startTime' | 'url' | 'status' | 'method' | 'responseTime';
type SortDirection = 'asc' | 'desc';

const useApiLogs = () => {
  // TODO DeviceInfo
  // const [deviceInfo, setDeviceInfo] = useState<DeviceType | null>(null);
  const [logs, setLogs] = useState<NetworkLog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    status: 'all',
    method: '',
  });
  const [sortKey, setSortKey] = useState<SortKey>('startTime');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredLogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matchesStatus = (log: NetworkLog) => {
      switch (filterCriteria.status) {
        case 'pending':
          return log.status === undefined;
        case 'success':
          return (
            log.status !== undefined && log.status >= 200 && log.status < 300
          );
        case 'redirect':
          return (
            log.status !== undefined && log.status >= 300 && log.status < 400
          );
        case 'clientError':
          return (
            log.status !== undefined && log.status >= 400 && log.status < 500
          );
        case 'serverError':
          return log.status !== undefined && log.status >= 500;
        default:
          return true;
      }
    };

    const matchesMethod = (log: NetworkLog) => {
      if (!filterCriteria.method) return true;
      return String(log.method ?? '').toUpperCase() === filterCriteria.method;
    };

    return logs.filter((log) => {
      const matchesQuery =
        !query ||
        String(log.url ?? '')
          .toLowerCase()
          .includes(query);

      return matchesQuery && matchesStatus(log) && matchesMethod(log);
    });
  }, [logs, searchQuery, filterCriteria]);

  const sortedLogs = useMemo(() => {
    const getDurationMs = (log: NetworkLog): number | null => {
      if (!log.startTime || !log.endTime) return null;
      const duration = log.endTime - log.startTime;
      return Number.isNaN(duration) ? 0 : duration;
    };

    const direction = sortDirection === 'asc' ? 1 : -1;

    const getValue = (log: NetworkLog, key: SortKey) => {
      switch (key) {
        case 'startTime':
          return log.startTime ?? 0;
        case 'url':
          return String(log.url ?? '');
        case 'status':
          return log.status ?? -1;
        case 'method':
          return String(log.method ?? '');
        case 'responseTime':
          return getDurationMs(log) ?? -1;
      }
    };

    return [...filteredLogs].sort((a, b) => {
      const valueA = getValue(a, sortKey);
      const valueB = getValue(b, sortKey);

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * direction;
      }

      return (Number(valueA) - Number(valueB)) * direction;
    });
  }, [filteredLogs, sortKey, sortDirection]);

  useEffect(() => {
    // TODO
    // socket.on(
    //   "log-history",
    //   (history: { logs: ApiLog[]; deviceInfo: DeviceType | null }) => {
    //     console.log(history.logs);
    //     setLogs(history.logs);
    //     setDeviceInfo(history.deviceInfo);
    //   },
    // );
    console.log(SOCKET_EVENTS.SERVER_TO_DASHBOARD);
    socket.on(SOCKET_EVENTS.SERVER_TO_DASHBOARD, (data: NetworkLog) => {
      console.log('data', data);
      setLogs((prev) => {
        const index = prev.findIndex((log) => log.id === data.id);
        if (index === -1) {
          return [data, ...prev];
        }
        const next = [...prev];
        next[index] = { ...next[index], ...data };
        return next;
      });
    });

    // socket.on("receive-connected-device-information", (data: DeviceType) => {
    //   setDeviceInfo(data);
    // });

    return () => {
      socket.off(SOCKET_EVENTS.SERVER_TO_DASHBOARD);
    };
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const applyFilters = useCallback((filters: FilterCriteria) => {
    setFilterCriteria(filters);
  }, []);

  const toggleSort = useCallback(
    (nextKey: SortKey) => {
      if (nextKey === sortKey) {
        setSortDirection((prevDir) => (prevDir === 'asc' ? 'desc' : 'asc'));
        return;
      }
      setSortKey(nextKey);
      setSortDirection(nextKey === 'startTime' ? 'desc' : 'asc');
    },
    [sortKey]
  );

  return {
    logs: sortedLogs,
    clearLogs,
    searchQuery,
    setSearchQuery,
    applyFilters,
    filterCriteria,
    sortKey,
    sortDirection,
    toggleSort,
  };
};

export type { SortKey, SortDirection };
export { useApiLogs };
