import React, { useState, useRef } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Peer from "simple-peer";


const TimerOverlay = ({ peersRef, socketRef }) => {
  const peer = useRef(peersRef);
  // const peer = useRef(peer);
  // console.log('peersRef: ', peer.current.signal());
  // // const peerRef = peerTimer.current;
  console.log('socketRef: ', socketRef.current);

  socketRef.current.on('')
  const initState = {
    minutes: 0,
    seconds: 0,
  };

  // peer.on('data', (timerData) => {
  //   console.log('Received Timer Data: ', timerData);
  // });

  const [reset, setReset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [timerInput, setTimerInput] = useState(initState);
  const [newTimer, setNewTimer] = useState(0);


  const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60

    return `${hours}:${minutes}:${seconds}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimerInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleReset = () => {
    if (!isEditing) {
      setReset(prevState => prevState + 1);
      setIsPlaying(prev => false);
    } else {
      const { minutes, seconds } = timerInput;
      const newMinutes = parseInt(minutes);
      const newSeconds = parseInt(seconds);

      const newDuration = (newMinutes * 60) + newSeconds;
      setNewTimer(newDuration);
      setReset(prevState => prevState + 1);
      setIsEditing(prevState => !prevState);
    }
  };

  const handleEdit = () => {
    setIsEditing(prevState => !prevState)

    if (isPlaying && !isEditing) {
      setIsPlaying(prev => false)
    }
  }

  const isEmpty = () => {
    return !newTimer;
  }

  return (
    <div>
      <div>
      <CountdownCircleTimer
        size={145}
        key={reset}
        isPlaying={isPlaying}
        duration={newTimer}
        colors={[
          ['#ffffff', 0.33],
          ['#fbe560', 0.33],
          ['#A30000', 0.33],
        ]}
      >
        { children }
      </CountdownCircleTimer>
      <button onClick={handlePause} disabled={isEmpty()}>{isPlaying ? "Pause" : "Start"}</button>
      <button onClick={handleReset}>{isEditing ? "Submit" : "Reset"}</button>
      <button onClick={handleEdit}>Edit</button>
      <div style={{ display: isEditing ? "flex" : "none" }}>
        <div className="timer_input">
          <input type="number" min="0" name="minutes" value={timerInput.minutes} onChange={handleChange}></input>
          <label className="timer_label">Minutes</label>
          <input type="number" min="0" name="seconds" value={timerInput.seconds} onChange={handleChange}></input>
          <label className="timer_label">Seconds</label>
      </div>
      </div>
      </div>
    </div>
  )
}

export default TimerOverlay
