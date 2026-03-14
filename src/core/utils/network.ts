import { type NetworkLog } from '../types';

const getDuration = (log: NetworkLog): number | null => {
  if (!log.endTime || !log.startTime) {
    return null;
  }
  const duration = log.endTime - log.startTime;
  return Number.isNaN(duration) ? 0 : duration;
};

const formatDuration = (log: NetworkLog): string => {
  const duration = getDuration(log);
  if (duration === null) return 'Pending...';
  return `${duration} ms`;
};

export { formatDuration };
