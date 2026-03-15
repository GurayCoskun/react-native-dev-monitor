#!/usr/bin/env node
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { default: openBrowser } = require('open');

const SOCKET_EVENTS = {
  APP_TO_SERVER: 'app:network-log',
  SERVER_TO_DASHBOARD: 'web:new-log',

  DISCONNECTED: 'disconnect',
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

const PORT = 3001;

const dashboardPath = path.join(__dirname, '../dashboard-dist');
app.use(express.static(dashboardPath));

io.on('connection', (socket) => {
  console.log(`📱 Device/Dashboard Connected: ${socket.id}`);

  socket.on(SOCKET_EVENTS.APP_TO_SERVER, (data) => {
    console.log('Receiving data: ', data.url, data.id);
    socket.broadcast.emit(SOCKET_EVENTS.SERVER_TO_DASHBOARD, data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Disconnected: ${socket.id}`);
  });
});

// 3. Başlat
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🚀 DevMonitor Dashboard & Server is running!
  -------------------------------------------
  🔗 URL: http://localhost:${PORT}
  -------------------------------------------
  `);

  // Dashboard'u otomatik aç
  openBrowser(`http://localhost:${PORT}`);
});
