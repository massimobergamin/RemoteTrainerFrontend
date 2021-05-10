import Axios from 'axios'
import React, { useEffect } from 'react'
import styles from '../styles/videoCall.module.css'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001');


const VideoCall = () => {

  useEffect(() => {
    socket.on('connect', () => {
      // listen here, not emit
      socket.emit('join-room', {userId: '1', roomId: 'mockRoomID'});
    });
  }, []);

  // on button click, init 
  

  return (
    <div>
      <div className={styles.videoGrid}>
        <button></button>
      </div>
    </div>
  )
}

export default VideoCall
