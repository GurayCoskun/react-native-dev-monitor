import { type NetworkLog } from '../types';

const getStatusColor = (status?: number) => {
  if (status === undefined) {
    return '#3b82f6';
  }
  if (status >= 200 && status < 300) {
    return '#16a34a';
  }
  if (status >= 300 && status < 400) {
    return '#0ea5e9';
  }
  if (status >= 400 && status < 500) {
    return '#f97316';
  }
  return '#dc2626';
};

const getResponseTimeColor = (duration?: number) => {
  if (duration === undefined || duration <= 300) {
    return '#16a34a';
  }
  if (duration <= 500) {
    return '#0ea5e9';
  }
  if (duration <= 700) {
    return '#f97316';
  }
  return '#dc2626';
};

const getLogColors = (log: NetworkLog) => {
  const duration =
    log.startTime && log.endTime ? log.endTime - log.startTime : undefined;

  return {
    statusColor: getStatusColor(log.status),
    responseTimeColor: getResponseTimeColor(duration),
  };
};

export { getLogColors };
