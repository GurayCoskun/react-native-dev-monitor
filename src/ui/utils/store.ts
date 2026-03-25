import type { NetworkLog } from '../../core';

type Listener = (logs: NetworkLog[]) => void;

const logsById = new Map<string, NetworkLog>();
const order: string[] = [];
const listeners = new Set<Listener>();

const snapshot = (): NetworkLog[] => {
  const result: NetworkLog[] = [];
  for (const id of order) {
    const log = logsById.get(id);
    if (log) result.push(log);
  }
  return result;
};

const emit = () => {
  const current = snapshot();
  listeners.forEach((listener) => {
    listener(current);
  });
};

const upsertLog = (log: NetworkLog) => {
  const existing = logsById.get(log.id);
  if (existing) {
    logsById.set(log.id, { ...existing, ...log });
    emit();
    return;
  }
  logsById.set(log.id, log);
  order.unshift(log.id);
  emit();
};

const clearLogs = () => {
  logsById.clear();
  order.length = 0;
  emit();
};

const subscribeLogs = (listener: Listener) => {
  listeners.add(listener);
  listener(snapshot());
  return () => {
    listeners.delete(listener);
  };
};

export { upsertLog, clearLogs, subscribeLogs };
