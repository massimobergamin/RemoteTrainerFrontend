import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket';
import Peer from "simple-peer";
import TimerOverlay from '../../components/timerOverlay';


const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, []);

  return <video className="video_them" playsInline autoPlay ref={ref} />;
}

const VideoRoom = () => {
	const router = useRouter();
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

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
    return peer;
  }

  function hangUp () {
    console.log("HANGING UP");
    socketRef.current.emit('disconnect')
  }

  return (
    <div>
      <video muted className="video_me" ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => <Video key={index} peer={peer} />)}
      <div className="timer_container">
        <TimerOverlay />
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