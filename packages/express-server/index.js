const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname + '/../vue-client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../vue-client/dist/index.html'));
});

const adminNamespace = io.of('/admin');

const brokerNamespace = io.of('/broker');

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

adminNamespace.on('connection', function(socket){
  console.log('Admin user connected');
  const hails = [
    'Hello user from Admin',
    'Admin says Hi',
    'Admin doing the rounds',
    'Admin, here for you!',
    'Maybe later admin',
    'Admin doing admin stuff',
  ]
  socket.on('randomChange', ()=>{
    const index = Math.floor((Math.random() * (hails.length-1)));
    console.log('Making random change' + index);    
    const data = {
      storeNumber: Math.random() * 100, 
      storeText: hails[index],
    }
    console.log(data);
    brokerNamespace.emit('update', data );

  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

brokerNamespace.on('connection', function(socket){
  console.log('Broker user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(8080, ()=>{
  console.log('Listening on http://localhost:8080');
});