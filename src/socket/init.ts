import { Platform } from 'react-native';
import { io, type Socket } from 'socket.io-client';

const getSocketUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3001';
  }
  return 'http://localhost:3001';
};

const socket: Socket = io(getSocketUrl(), {
  transports: ['websocket'],
  autoConnect: true,
});

socket.on('connect', () => {
  console.log('✅ [DevMonitor] Connected to Dashboard Server');
});

export default socket;
