import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' }});

const registerHousekeeping = (socket) => {
  console.log('\nNew client connected');

  // client.send(data) - don't do this
  socket.on('message', (data) => {
    console.log(`Message from send - ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected\n');
  });
}

const registerDialHandler = (socket) => {
  socket.on('dial:affinity', (affinity) => {
    console.log(affinity)
  });

  socket.on('dial:reset', () => {});
}

// probably not getting anything back from the booth
const registerBoothHandler = (socket) => {}

const onConnection = (socket) => {
  registerHousekeeping(socket);
  registerDialHandler(socket);
  registerBoothHandler(socket);
}

io.on('connection', onConnection);

httpServer.listen(3001, () => { console.log('Socket.io listening at :3001') });
