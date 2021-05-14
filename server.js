const express = require('express');
const cors = require('cors');
const PORT = 3001;
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})
const { ExpressPeerServer } = require('peer');
const mocks = require('./mocks')
const peerServer = ExpressPeerServer(server, {
  path: '/'
});


app.use('/peerjs', peerServer);

peerServer.on('connection', peer => {
  console.log("Peer connected", peer.id)
})

const users = {};
const socketToRoom = {};

io.on('connection', socket => {
  socket.on("join room", roomID => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      console.log("SOCKET2: ", socket.id)
      users[roomID].push(socket.id);
    } else {
      console.log("FIRST SOCKET: ", socket.id)
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", payload => {
    console.log("SENDING SIGNAL:", payload.callerID)
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
    console.log("RETURNING SIGNAL: ", payload.userToSignal, " FROM: " , payload.callerID)
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  socket.on('disconnect', () => {
    console.log("DISCONNECTING")
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      users[roomID] = room;
    }
  });
});
// io.on('connection', socket => {
//   console.log('Connected to Client')

//   //listens for create new room given by sessionId from "START CALL" button on page session/:id
//   socket.on('createNewRoom', ({userId, sessionId, firstName}) => {
//     socket.join(sessionId); // joins room using sessionId as roomId
//     console.log("CREATED ROOM", userId, firstName)
//     // TODO: call db to add in_use flag with sessionId
//     socket.broadcast.emit("user-connected", userId) //to tell person in room you are there
//   });

//   //listens for a useEffect to check get sessionId row and send it back to page session/:id
//   socket.on('isRoomActive', ({userId, sessionId}, callback) => {
//     //TODO: call controller to get appointment row and send the whole row back
//     callback(mocks.withRoom)
//   });

//   //listens for join an existing room given by roomId from "JOIN CALL" button on page session/:id
//   socket.on('joinRoom', ({userId, firstName, sessionId}) => {
//     socket.join(sessionId)  //join existing room
//   let numClients = io.sockets.adapter.rooms.get(sessionId).size
//   //if (numClients <= 1) {
//       socket.broadcast.emit("user-connected", userId) //to tell person in room you are there
//     //}
    
//     socket.on('disconnect', () => {
//       socket.broadcast.emit('user-disconnected')
//   })
//   })

//   //listens for a disconnect
//   socket.on('hang-up', () => {
//     socket.broadcast.emit("call-ended")
//     socket.disconnect();
//     console.log("I AM DISCONNECTED")
//   })
// });


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

