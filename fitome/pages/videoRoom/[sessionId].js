import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket';
import Peer from "simple-peer";
import { useAuth } from '../../firebase/contextAuth';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const Video = ({ peer }) => {
  const ref = useRef();
  const { currentUser } = useAuth();

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, []);

  return <video id="video_them" className="video_them" playsInline autoPlay ref={ref} />;
}

const initState = {
  minutes: 0,
  seconds: 0,
};

const VideoRoom = () => {
	const router = useRouter();
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  // **** TIMER STATE ADDED BELOW **** //
  const [reset, setReset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [timerInput, setTimerInput] = useState(initState);
  const [newTimer, setNewTimer] = useState(0);

  const { sessionId } = router.query;

  useEffect(() => {
    socketRef.current = socket.connect("/");

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then((stream) => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit("join room", sessionId);

      socketRef.current.on("all users", users => {
        const peers = [];
        users.forEach((userID) => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          })
          peers.push(peer);
        })
        setPeers(peers);
      })

      socketRef.current.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        })
        setPeers(users => [...users, peer]);
      });

      socketRef.current.on("receiving returned signal", payload => {
        const item = peersRef.current.find(({ peerID }) => peerID === payload.id);
        item.peer.signal(payload.signal);
      });

      socketRef.current.on('callEnded', res => {
        const themVideo = document.getElementById('video_them');
        peersRef.current.length >= 1 && peersRef.current.forEach(peer=>{
          peer.peer.destroy();
        });
         themVideo && themVideo.remove();
        if (userVideo.current) {
          userVideo.current.srcObject.getTracks()[0].stop()
          userVideo.current.srcObject.getTracks()[1].stop()
        }
         router.push('/session')
      });

    })
  }, []);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      })
    })

    // once connected, send data to other peer
    peer.on('data', data => {
      const parsedTimerData = JSON.parse(data);
      const { peerNewTimer, peerIsEditing, peerIsPlaying, peerReset, peerTimerInputName, peerTimerInputValue } = parsedTimerData;
      if (peerNewTimer !== undefined) setNewTimer(peerNewTimer);
      if (peerIsEditing !== undefined) setIsEditing(peerIsEditing);
      if (peerIsPlaying !== undefined) setIsPlaying(peerIsPlaying);
      if (peerReset !== undefined) setReset(peerReset);
      if (peerTimerInputName !== undefined && peerTimerInputValue !== undefined) setTimerInput((prev) => ({
        ...prev,
        [peerTimerInputName]: peerTimerInputValue,
      }));
      //console.log('parsed data line 132: ', JSON.parse(data));
    });
    return peer;
  }

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", {
        signal,
        callerID,
      })
    })

    peer.signal(incomingSignal);
    // when peer receives data, log the data to the console
    peer.on('data', data => {
      const parsedTimerData = JSON.parse(data);
      const { peerNewTimer, peerIsEditing, peerIsPlaying, peerReset, peerTimerInputName, peerTimerInputValue } = parsedTimerData;
      if (peerNewTimer !== undefined) setNewTimer(peerNewTimer);
      if (peerIsEditing !== undefined) setIsEditing(peerIsEditing);
      if (peerIsPlaying !== undefined) setIsPlaying(peerIsPlaying);
      if (peerReset !== undefined) setReset(peerReset);
      if (peerTimerInputName !== undefined && peerTimerInputValue !== undefined) setTimerInput((prev) => ({
        ...prev,
        [peerTimerInputName]: peerTimerInputValue,
      }));
    });
    return peer;
  }

  function hangUp () {
    console.log("HANGING UP");
    userVideo.current.srcObject.getTracks()[0].stop()
    userVideo.current.srcObject.getTracks()[1].stop()
    socketRef.current.emit('endCall')
    router.push('/session')
  }


  // ****** TIMER LOGIC ****** //

  const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60

    return <div className="timer_time">{`${hours}:${minutes}:${seconds}`}</div>
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;

    await new Promise((resolve, reject) => resolve(setTimerInput((prev) => ({
      ...prev,
      [name]: value,
    })))).then(() => {
      peersRef.current.map(peer => {
        const timerData = {
          peerTimerInputName: name,
          peerTimerInputValue: value,
        }
        const timerDataJson = JSON.stringify(timerData);
        peer.peer.send(timerDataJson);
      })
    });
  };

  const handlePause = async () => {
    await new Promise((resolve, reject) => resolve(setIsPlaying(prev => !prev))).then(() => {
      peersRef.current.map(peer => {
        const timerData = {
          peerIsPlaying: !isPlaying,
        }
        const timerDataJson = JSON.stringify(timerData);
        peer.peer.send(timerDataJson);
      })
    }
    );
  };

  const handleReset = async () => {
    if (!isEditing) {
      await new Promise((resolve, reject) => resolve(setReset(prevState => prevState + 1))).then(() => {
        peersRef.current.map(peer => {
          const timerData = {
            peerReset: reset + 1,
          }
          const timerDataJson = JSON.stringify(timerData);
          peer.peer.send(timerDataJson);
        })
      });
      await new Promise((resolve, reject) => resolve(setIsPlaying(prev => false))).then(() => {
        peersRef.current.map(peer => {
          const timerData = {
            peerIsPlaying: isPlaying,
          }
          const timerDataJson = JSON.stringify(timerData);
          peer.peer.send(timerDataJson);
        })
      });
    } else {
      const { minutes, seconds } = timerInput;
      const newMinutes = parseInt(minutes);
      const newSeconds = parseInt(seconds);

      const newDuration = (newMinutes * 60) + newSeconds;
      await new Promise((resolve, reject) => resolve(setNewTimer(newDuration))).then(() => {
        peersRef.current.map(peer => {
          const timerData = {
            peerNewTimer: newDuration, // check if naming needs to be changed here, no negator used (like others)
          }
          const timerDataJson = JSON.stringify(timerData);
          peer.peer.send(timerDataJson);
        })
      });
      await new Promise((resolve, reject) => resolve(setReset(prevState => prevState + 1))).then(() => {
        peersRef.current.map(peer => {
          const timerData = {
            peerReset: reset + 1,
          }
          const timerDataJson = JSON.stringify(timerData);
          peer.peer.send(timerDataJson);
        })
      });
      await new Promise((resolve, reject) => resolve(setIsEditing(prevState => !prevState))).then(() => {
        peersRef.current.map(peer => {
          const timerData = {
            peerIsEditing: !isEditing,
          }
          const timerDataJson = JSON.stringify(timerData);
          peer.peer.send(timerDataJson);
        })
      });
      console.log('peer instance: ', peersRef.current[0]);
    }
  };

  const handleEdit = async () => {
    await new Promise((resolve, reject) => resolve(setIsEditing(prevState => !prevState))).then(() => {
      console.log('line 274: ', isEditing)
      peersRef.current.map(peer => {
        const timerData = {
          peerIsEditing: !isEditing,
        }
        console.log('line 279: ', timerData);
        const timerDataJson = JSON.stringify(timerData);
        peer.peer.send(timerDataJson);
      })
    });
    if (isPlaying && !isEditing) {
      await new Promise((resolve, reject) => resolve(setIsPlaying(prev => false))).then(() => {
        peersRef.current.map(peer => {
          const timerData = {
            peerIsPlaying: isPlaying,
          }
          const timerDataJson = JSON.stringify(timerData);
          peer.peer.send(timerDataJson);
        })
      });
    };
  };

  const isEmpty = () => {
    return !newTimer;
  }


  return (
    <div>
      <video muted className="video_me" ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => <Video key={index} peer={peer} />)}
      { currentUser.displayName==="trainer" ?
        <div>
          <div className="timer_container">
          <CountdownCircleTimer
            size={125}
            key={reset}
            isPlaying={isPlaying}
            duration={newTimer}
            colors={[
              ['#94d2c9', 0.33],
              ['#ee9b00', 0.33],
              ['#ca6702', 0.33],
            ]}
          >
            { children }
          </CountdownCircleTimer>
          <div className="timer_button_container">
            <button className="timer_button" onClick={handlePause} disabled={isEmpty()}>{isPlaying ? "Pause" : "Start"}</button>
            <button className="timer_button" onClick={handleReset}>{isEditing ? "Submit" : "Reset"}</button>
            <button className="timer_button" onClick={handleEdit}>Edit</button>
          </div>
          <div className="timer_input" style={{ display: isEditing ? "flex" : "none" }}>
            <div className="firstInput">
              <input type="number" min="0" name="minutes" value={timerInput.minutes} onChange={handleChange}></input>
              <label className="timer_label">Min</label>
            </div>
            <div className="secondInput">
              <input type="number" min="0" name="seconds" value={timerInput.seconds} onChange={handleChange}></input>
              <label className="timer_label">Sec</label>
            </div>
          </div>
        </div>
      </div> : null }
      <div className="endCall">
        <button type="button" onClick={hangUp} className="button_circle"><img src="/icons/call_end_white_24dp.svg"/></button>
    </div>
    </div>
  );
}

export default VideoRoom