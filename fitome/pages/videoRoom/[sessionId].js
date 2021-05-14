import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket';
import Peer from "simple-peer";

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

  return (
    <div>
      <video className="video_me" muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => <Video key={index} peer={peer} />)}
    </div>
  );
}

export default VideoRoom
    // document.addEventListener("DOMContentLoaded", function(){
    //     const myVideoScreen = document.getElementById('video_me');
    //     const themVideoScreen = document.getElementById('video_them');
    //     //dom is fully loaded, but maybe waiting on images & css files
    // });

    // myPeer?.on('open', peerId => { // When we first open the app, have us join a room
    //     console.log('USERID:', currentUser.uid, "peerID:", peerId)
    //     socket.emit('join-room', {userId: peerId, firstName:"MARK", sessionId:sessionId})
    //     console.log("PEERID", peerId, " ROOMID ", sessionId)
    // })

    // function connectToNewUser(userId, stream) { // This runs when someone joins our room
    //     console.log("CONNECTING TO NEW USER", userId, " ", stream, myPeer)
    //     const call = myPeer?.call(userId, stream) // Call the user who just joined
        
    //     //Add their video
    //     console.log("CALLING", call)
    //     const video = document.createElement('video')
    //     video.muted = true;
    //     video.classList.add("video_them")
    //     call?.on('stream', remoteStream => {
    //         //console.log("CONTAINER: ",document.getElementById('video_them') )
    //         addVideoStream(video, remoteStream, document.getElementById('video_them'))
    //     })
    //     //If they leave, remove their video
    //     call?.on('close', () => {
    //         video.remove()
    //     })
    // }

    // function addVideoStream (video, stream, container) {
    //     if (container) {
    //         video.srcObject = stream;
    //         video.addEventListener('loadedmetadata', () => {
    //         video.play();
    //         })
    //         container.append(video);
    //     }
    //   }
    
    // navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: true
    // }). then (stream => {
    //     const myVideo = document.createElement('video');
    //     myVideo.muted = true;
    //     myVideo.classList.add("video_me")
    //     setStreamTest(stream)
    //     //console.log("CONTAINER: ",document.getElementById('video_me') )
    //     addVideoStream(myVideo, stream, document.getElementById('video_me'))

    //     myPeer?.on('call', call => { // When we join someone's room we will receive a call from them
    //         console.log("ANSWERING CALL", call, "   ", stream)
    //         call?.answer(stream) // Stream them our video/audio
    //         const video = document.createElement('video');
    //         //video.muted = true;
    //         video.classList.add("video_them")
    //         call?.on('stream', remoteStream=> { // When we recieve their stream
    //             addVideoStream(video, remoteStream, document.getElementById('video_them')) // Display their video to ourselves
    //             //console.log("CONTAINER: ",document.getElementById('video_them') )
    //         })
    //     })
        
    //     myPeer?.on('error', err => console.log("ERROR", err))

    //     socket.on('user-connected', userId => { // If a new user connect, connect to them
    //         console.log("Socket user connected", userId);
    //         connectToNewUser(userId, stream)
    //     })

    //     socket.on('call-ended', res => {
    //         myPeer?.disconnect();
    //         const themVideo = document.getElementById('video_them');
    //         themVideo.remove();
    //         if (streamTest) {
    //             streamTest.getTracks()[0].stop()
    //             streamTest.getTracks()[1].stop()
    //             setStreamTest(null)
    //         }
    //         router.push('/')
    //     })
        
    // })

    // useEffect(() => {
    //     import('peerjs').then(({ default: Peer }) => {
    //     const peerPlug = new Peer(currentUser.uid, {
    //         host: "localhost",
    //         path: "/peerjs",
    //         port: 3001
    //     });
    //     setPeer(peerPlug)
    //     });
    // }, []);
        //if (currentUser) {
            //import('peerjs').then(({ default: Peer }) => {
                // const myPeer = new Peer(currentUser.uid, {
                //     //, {
                //      host: "localhost",
                //      path: "/peerjs",
                //      port: 3001
                // }
                // );
                // const myVideoScreen = document.getElementById('video_me');
                // const themVideoScreen = document.getElementById('video_them');

                // myPeer.on('open', peerId => { // When we first open the app, have us join a room
                //     console.log('USERID:', currentUser.uid, "peerID:", peerId)
                //     socket.emit('join-room', {userId: peerId, firstName:"MARK", sessionId:sessionId})
                //     console.log("PEERID", peerId, " ROOMID ", sessionId)
                // })

                // myPeer.on('connection', peerId => { // When we first open the app, have us join a room
                //     console.log('USERID:', currentUser.uid, "peerID:", peerId)
                //     socket.emit('join-room', {userId: peerId, firstName:"MARK", sessionId:sessionId})
                //     console.log("PEERID2", peerId, " ROOMID ", sessionId)
                // })

                // navigator.mediaDevices.getUserMedia({
                //     video: true,
                //     audio: true
                // }). then (stream => {
                //     const myVideo = document.createElement('video');
                //     myVideo.muted = true;
                //     myVideo.classList.add("video_me")
                //     setStreamTest(stream)
                //     addVideoStream(myVideo, stream, document.getElementById('video_me'))

                //     myPeer?.on('call', call => { // When we join someone's room we will receive a call from them
                //         console.log("ANSWERING CALL", call, "   ", stream)
                //         call.answer(stream) // Stream them our video/audio
                //         const video = document.createElement('video');
                //         //video.muted = true;
                //         video.classList.add("video_them")
                //         call.on('stream', remoteStream=> { // When we recieve their stream
                //             addVideoStream(video, remoteStream, document.getElementById('video_them')) // Display their video to ourselves
                //         })
                //     })
                    
                //     myPeer?.on('error', err => console.log("ERROR", err))

                //     socket.on('user-connected', userId => { // If a new user connect, connect to them
                //         console.log("Socket user connected", userId);
                //         connectToNewUser(userId, stream)
                //     })

                //     socket.on('call-ended', res => {
                //         myPeer?.disconnect();
                //         const themVideo = document.getElementById('video_them');
                //         themVideo.remove();
                //         if (stream) {
                //             stream.getTracks()[0].stop()
                //             stream.getTracks()[1].stop()
                //             setStreamTest(null)
                //         }
                //         router.push('/')
                //     })
                    
                // })
            
                // function connectToNewUser(userId, stream) { // This runs when someone joins our room
                //     console.log("CONNECTING TO NEW USER", userId, " ", stream, myPeer)
                //     const call = myPeer.call(userId, stream) // Call the user who just joined
                    
                //     //Add their video
                //     console.log("CALLING", call)
                //     const video = document.createElement('video')
                //     video.muted = true;
                //     video.classList.add("video_them")
                //     call.on('stream', remoteStream => {
                //         addVideoStream(video, remoteStream, themVideoScreen)
                //     })
                //     //If they leave, remove their video
                //     call?.on('close', () => {
                //         video.remove()
                //     })
                // }

                // function addVideoStream (video, stream, container) {
                //     video.srcObject = stream;
                //     video.addEventListener('loadedmetadata', () => {
                //       video.play();
                //     })
                //     container.append(video);
                //   }
                
            //});
    //     }
    // },[])
    
//    function hangUp () {
//        streamTest.getTracks()[0].stop()
//        streamTest.getTracks()[1].stop()
//        setStreamTest(null)
//        socket.emit('hang-up', currentUser.uid)
//        router.push("/")
//    }

//     return (
//         <div>
//           <div className="call_background"><h1>Waiting for Participant...</h1></div>
//           <div id="video_them" className="videoRoom_theirVideo">
//             {peers.map((peer, index) => <Video key={index} peer={peer} />)}
//           </div>
//           <div id="video_me" className="videoRoom_myVideo" >
//           <video className="video_me" muted ref={userVideo} autoPlay playsInline />
//           </div>
//           <div className="endCall">
//           <button type="button" onClick={() => hangUp()} className="button_circle"><img src="/icons/call_end_white_24dp.svg"/></button>
//           </div> 
//           <div className="timer_container">

//           </div>
//         </div>
//     )
// }
 
// export default VideoRoom


//export default VideoRoom