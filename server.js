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
const { v4: uuidV4 } = require('uuid')
const mocks = require('./mocks')

// app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Video Testing Babyyyyy!');
// })


// app.get('/video/newCall', (req, res) => {
//   res.redirect(`/${uuidV4()}`)
// });


// app.get('/video/:room', (req, res) => {
//   res.send(req.params.room);
// });


io.on('connection', socket => {
  console.log('Connected to Client')
  // socket.on('join-room', (roomId, userId) => {
  //   console.log(roomId, userId);
  // });

  socket.on('createNewRoom', ({userId, firstName}) => {
    const roomId = uuidV4();
    socket.join(roomId);
    console.log("CREATED ROOM", roomId, " ", userId, firstName)
    socket.emit("roomCreated", {roomId, userId});
  });

  socket.on('isRoomActive', ({userId, sessionId}, callback) => {
    console.log("USER", userId)
    console.log("Session", sessionId)
    callback(mocks.withRoom)    
  });

  socket.on('joinRoom', ({userId, firstName, roomId}) => {
    socket.join(roomId)
    console.log("JOINING ROOM", roomId)
    socket.to(roomId).emit(`${firstName} has joined the session.`)
  })
});


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

