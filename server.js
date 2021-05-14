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
const users = {};
const socketToRoom = {};

// app.use('/peerjs', peerServer);

// peerServer.on('connection', peer => {
//   console.log("Peer connected", peer.id)
// })

io.on('connection', socket => {
  socket.on("join room", roomID => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
      console.log("SOCKET2:" ,socket.id)
    } else {
      users[roomID] = [socket.id];
      console.log("FIRST SOCKET: ", socket.id)
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", payload => {
    console.log("SENDING SIGNAL", payload.userToSignal, "*** ",payload.callerID)
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
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

  //listens for create new room given by sessionId from "START CALL" button on page session/:id
  // socket.on('createNewRoom', ({userId, sessionId, firstName}) => {
  //   socket.join(sessionId); // joins room using sessionId as roomId
  //   console.log("CREATED ROOM", userId, firstName)
  //   // TODO: call db to add in_use flag with sessionId
  //   socket.broadcast.emit("user-connected", userId) //to tell person in room you are there
  // });

  //listens for a useEffect to check get sessionId row and send it back to page session/:id
  // socket.on('isRoomActive', ({userId, sessionId}, callback) => {
  //   //TODO: call controller to get appointment row and send the whole row back
  //   callback(mocks.withRoom)
  // });

  //listens for join an existing room given by roomId from "JOIN CALL" button on page session/:id
  // socket.on('join-room', ({userId, sessionId}) => {
  //   socket.join(sessionId)  //join existing room
  // let numClients = io.sockets.adapter.rooms.get(sessionId).size
  // //if (numClients <= 1) {
  //     socket.broadcast.emit("user-connected", userId) //to tell person in room you are there
  //   //}
    
  //   socket.on('disconnect', () => {
  //     socket.broadcast.emit('user-disconnected')
  // })
  // })

  // socket.on("join room", roomId => {
  //   if  (users[roomId]) {
  //     const length = users[roomId].length;
  //     if (length===2) {
  //       socket.emit("room full")
  //       return;
  //     }
  //     console.log("SOCKET ID:", socket.id)
  //     users[roomId].push(socket.id)
  //   } else {
  //     console.log("FIRST SOCKET ID: ", socket.id)
  //     users[roomId] = [socket.id]
  //   }
  //   socketToRoom[socket.id] = roomId;
  //   const usersInThisRoom = users[roomId].filter(id => id !== socket.id)
  //   socket.emit("all users", usersInThisRoom)
  // })

  // socket.on("sending signal", payload => {
  //   console.log("SENDING SIGNAL: ", payload.userToSignal)
  //   io.to(payload.userToSignal).emit('user joined', {signal: payload.signal, callerId:payload.callerId});
  // })

  // socket.on("returning signal", payload => {
  //   console.log("RETURNING SIGNAL: ", payload)
  //   io.to(payload.callerId).emit('receiving returned signal', {signal: payload.signal, id:socket.id});
  // })

  // socket.on('disconnect', () => {
  //   console.log("DISCONNECTING")
  //   const roomId = socketToRoom[socket.id];
  //   let room = users[roomId];
  //   if (room) {
  //     room = room.filter(id => id !== socket.id);
  //     users[roomId] = room
  //   }
  // });

  //listens for a disconnect
  // socket.on('hang-up', () => {
  //   socket.broadcast.emit("call-ended")
  //   socket.broadcast.emit('user-disconnected')
  //   socket.disconnect();
  //   console.log("I AM DISCONNECTED")
  // })
//});


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

