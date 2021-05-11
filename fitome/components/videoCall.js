import React, { useEffect, useContext, useState } from 'react'
// import { io } from 'socket.io-client'
import {useAuth} from '../firebase/contextAuth'
import { socket } from '../lib/socket';

// lib/socket/index.js
// export const socket = io('http://localhost:3001');



const VideoCall = () => {

  const { currentUser } = useAuth();
  console.log(currentUser?.uid)
  const [roomId, setRoomId] = useState("");

  // On click, new room is created and user is joined into room
  const newRoom = () => {
    socket.emit('createNewRoom', {userId: currentUser?.uid, firstName: currentUser?.email});
  };

  //on click, join a room that already exists
  const joinRoom = () => {
    socket.emit('joinRoom', {userId: "eZRIzsBdiuZUWvsKCGwtO2QU1OC2", roomId: roomId});
  }

  useEffect(() => {
    socket.on('connect', () => {
      // listen here, not emit
      socket.on("roomCreated", ({roomId, userId}) => {
        console.log("roomCreated ID:", roomId, ' ', userId);
        setRoomId(roomId)
      });
      // socket.on('joinRoom', ({roomId, userId}) => {
      //   console.log("joined RoomID:", roomId, ' ', userId);
      // });
      
    });
  }, []);


  return (
    <div>
      <div className="videoCall_videoGrid">
        <div>Video Screen</div>
      </div>
      <button type="button" onClick={newRoom}>NEW CALL</button>
      {/* <button type="button" onClick={joinRoom}>JOIN CALL</button> */}
    </div>
  )
}

export default VideoCall




// BEN'S LIST:

// pages
//   - appointmentList (would list all appointment for the current user)
//     - singleAppointment (would list the single appointment)

// ///

// Inside `singleAppointment` page
//  - useEffect to `socket.emit` event to check if a video call has already been created, you'll have to pass the appointment id as the payload of emit event
//     - set the state of your component/page to reflect this `setRoomCreated(roomCreated // boolean)`
//     - if `roomCreated === true` then show the join button else create button


// const AppointmentPage = () => {
//   const [state, setState] = useState({
//     isRoomActive: false,
//   })

//   useEffect(() => {
//     socket.emit('isRoomActive', { appointmentId }, (res) => {
//       setState((prev) => ({
//         ...prev,
//         isRoomActive: true,
//       }))
//     })

//     if (isRoomActive) {
//       // may need to get details of the action room to join it
//     }
//   })

//   return (
//     isRoomActive ? <JoinRoomButton /> : <CreateCallButton />
//   )
// }
