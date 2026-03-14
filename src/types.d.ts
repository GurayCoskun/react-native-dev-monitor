import type { NetworkLog } from './core';

declare global {
  interface XMLHttpRequest {
    _log: NetworkLog;
  }
}
export {};
