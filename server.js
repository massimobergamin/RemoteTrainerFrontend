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



app.use(cors());

app.get('/', (req, res) => {
  res.send('Video Testing Babyyyyy!');
})


// app.get('/video/newCall', (req, res) => {
//   res.redirect(`/${uuidV4()}`)
// });


// app.get('/video/:room', (req, res) => {
//   res.send(req.params.room);
// });


io.on('connection', socket => {
  console.log('Connected to Client')
  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId);
  });
});


server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

