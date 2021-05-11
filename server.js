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

  //listens for create new room given by sessionId from "START CALL" button on page session/:id
  socket.on('createNewRoom', ({userId, sessionId, firstName}) => {
    // const roomId = uuidV4();
    socket.join(sessionId); // joins room using sessionId as roomId
    console.log("CREATED ROOM", userId, firstName)
    // TODO: call db to add in_use flag with sessionId
  });

  //listens for a useEffect to check get sessionId row and send it back to page session/:id
  socket.on('isRoomActive', ({userId, sessionId}, callback) => {
    //TOOD: call controller to get appointment row and send the whole row back
    callback(mocks.withRoom)
  });

  //listens for join an existing room given by roomId from "JOIN CALL" button on page session/:id
  socket.on('joinRoom', ({userId, firstName, sessionId}) => {
    socket.join(sessionId)  //join existing room
    console.log("JOINING ROOM", sessionId)
    io.to(roomId).emit(`${firstName} has joined the session.`) //to tell person in room you are there
  })

  //listens for a disconnect
  socket.on('disconnect', () => {
    socket.broadcast.emit("Call Ended")
  })
});


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

