import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket';
import Peer from "simple-peer";
import TimerOverlay from '../../components/timerOverlay';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const Video = ({ peer }) => {
  const ref = useRef();

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

  // **** TIMER STATE ADDED FOR TESTING **** // 
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
        console.log(peersRef.current)
        const themVideo = document.getElementById('video_them');
        console.log(themVideo, "THEM");
        peersRef.current.length >= 1 && peersRef.current.forEach(peer=>{
          peer.peer.destroy();
          console.log(peer.peer)
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
    peer.on('connect', () => {
      // const timerData = {
      //   newTimer: newTimer,
      //   isEditing: isEditing,
      //   isPlaying: isPlaying,
      //   reset: reset,
      // }
      // const timerDataJson = JSON.stringify(timerData);
      // peer.send(timerDataJson);
    });

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
      console.log('parsed data line 132: ', JSON.parse(data));
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
      console.log('parsed data line 160: ', JSON.parse(data));
    });

    peer.on('connect', () => {
      // const timerData = {
      //   newTimer: newTimer,
      //   isEditing: isEditing,
      //   isPlaying: isPlaying,
      //   reset: reset,
      // }
      // const timerDataJson = JSON.stringify(timerData);
      // peer.send(timerDataJson);
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


  // ****** TIMER LOGIC ADDED BELOW FOR TESTING ***** // 

  const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60
  
    return `${hours}:${minutes}:${seconds}`
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

  // const wrapSetState = async () => {

  // }
  
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
      <div className="timer_container">
      <div>
      <div>
      <CountdownCircleTimer
        size={125}
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
      </div>
      <div className="endCall">
        <button type="button" onClick={hangUp} className="button_circle"><img src="/icons/call_end_white_24dp.svg"/></button>
    </div> 
    </div>
  );
}

export default VideoRoom


// import React, {useEffect, useState} from 'react'
// // import Peer from 'peerjs';
// import { useRouter } from 'next/router'
// import {useAuth} from '../../firebase/contextAuth'
// import {socket} from '../../lib/socket'

// function VideoRoom() {
//     const router = useRouter();
//     const { currentUser } = useAuth();
//     const [stream, setStream] = useState(null)
//     const { sessionId } = router.query;
//     const [them, setThem] = useState({})

    
//     useEffect(() => {
//         if (currentUser) {
//             import('peerjs').then(({ default: Peer }) => {
//                 const myPeer = new Peer(currentUser.uid
//                     //, {
//                     // host: "localhost",
//                     // path: "/peerjs",
//                     // port: 3001
//                 //}
//                 );
//                 const myVideoScreen = document.getElementById('video_me');
//                 const themVideoScreen = document.getElementById('video_them');

//                 myPeer.on('open', peerId => { // When we first open the app, have us join a room
//                     socket.emit('joinroom', {userId: peerId, firstName:"MARK", sessionId:sessionId})
//                     console.log("PEERID", peerId, " ROOMID ", sessionId)
//                 })

//                 navigator.mediaDevices.getUserMedia({
//                     video: true,
//                     audio: true
//                 }). then (stream => {
//                     const myVideo = document.createElement('video');
//                     myVideo.muted = true;
//                     myVideo.classList.add("video_me")
//                     setStream(stream)
//                     addVideoStream(myVideo, stream, myVideoScreen)

//                     myPeer.on('call', call => { // When we join someone's room we will receive a call from them
//                         console.log("ANSWERING CALL", call, "   ", stream)
//                         call?.answer(stream) // Stream them our video/audio
//                         const video = document.createElement('video');
//                         //video.muted = true;
//                         video.classList.add("video_them")
//                         call?.on('stream', userVideoStream => { // When we recieve their stream
//                             addVideoStream(video, userVideoStream, themVideoScreen) // Display their video to ourselves
//                         })
//                     })
                    

//                     socket.on('user-connected', userId => { // If a new user connect, connect to them
//                         console.log("Socket user connected", userId);
//                         connectToNewUser(userId, stream) 
//                     })

//                     socket.on('call-ended', res => {
//                         myPeer.disconnect();
//                         const themVideo = document.getElementById('video_them');
//                         themVideo.remove();
//                         if (stream) {
//                             stream.getTracks()[0].stop()
//                             stream.getTracks()[1].stop()
//                             setStream(null)
//                         }
//                         router.push('/')
//                     })
                    
//                 })
            
//                 function connectToNewUser(userId, stream) { // This runs when someone joins our room
//                     console.log("CONNECTING TO NEW USER", userId, " ", stream, myPeer)
//                     const call = myPeer.call(userId, stream) // Call the user who just joined
//                     //Add their video
//                     console.log("CALLING", call)
//                     const video = document.createElement('video')
//                     //video.muted = true;
//                     video.classList.add("video_them")
//                     call?.on('stream', userVideoStream => {
//                         addVideoStream(video, userVideoStream, themVideoScreen)
//                     })
//                     //If they leave, remove their video
//                     call?.on('close', () => {
//                         video.remove()
//                     })
//                 }

//                 function addVideoStream (video, stream, container) {
//                     video.srcObject = stream;
//                     video.addEventListener('loadedmetadata', () => {
//                       video.play();
//                     })
//                     container.append(video);
//                   }
                
//             });
//         }
//     },[currentUser])
    
//    function hangUp () {
//        stream.getTracks()[0].stop()
//        stream.getTracks()[1].stop()
//        setStream(null)
//        socket.emit('hang-up', currentUser.uid)
//        router.push("/")
//    }

//     return (
//         <div>
//           <div className="call_background"><h1>Waiting for Participant...</h1></div>
//           <div id="video_them" className="videoRoom_theirVideo" >

//           </div>
//           <div id="video_me" className="videoRoom_myVideo" >

//           </div>
//           <div className="endCall">
//           <button type="button" onClick={() => hangUp()} className="button_circle"><img src="/icons/call_end_white_24dp.svg"/></button>
//           </div> 
//         </div>
//     )
// }

// export default VideoRoom