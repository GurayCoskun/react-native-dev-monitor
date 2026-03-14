import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { type NetworkLog, SOCKET_EVENTS } from '../src';

const PORT = 3001;
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log(`📱 Device Connected: ${socket.id}`);

  socket.on(SOCKET_EVENTS.APP_TO_SERVER, (data: NetworkLog) => {
    console.log(
      'New Network Log Sending To: ',
      SOCKET_EVENTS.SERVER_TO_DASHBOARD
    );
    socket.broadcast.emit(SOCKET_EVENTS.SERVER_TO_DASHBOARD, data);
  });

  socket.on(SOCKET_EVENTS.DISCONNECTED, () => {
    console.log(`❌ Device Disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 DevMonitor TS Server: http://localhost:${PORT}`);
});
