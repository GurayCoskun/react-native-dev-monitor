import { type NetworkLog, SOCKET_EVENTS } from '../../core';
import socket from './init';

const sendNetworkLog = (log: NetworkLog) => {
  if (socket.connected) {
    socket.emit(SOCKET_EVENTS.APP_TO_SERVER, log);
  }
};

export { sendNetworkLog };
