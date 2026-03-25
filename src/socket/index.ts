import { type NetworkLog, SOCKET_EVENTS } from '../core';
import socket from './init';

const sendNetworkLog = (log: NetworkLog) => {
  if (socket.connected) {
    socket.emit(SOCKET_EVENTS.APP_TO_SERVER, log);
  } else {
    console.warn('🔌 [DevMonitor] Socket not connected. Log skipped:', log.url);
  }
};

export { sendNetworkLog };
