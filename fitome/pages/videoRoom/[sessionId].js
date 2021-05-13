import React, {useEffect, useState, useRef} from 'react'
// import Peer from 'peerjs';
import { useRouter } from 'next/router'
import {useAuth} from '../../firebase/contextAuth'
import {socket} from '../../lib/socket'

const userMediaConfig = { audio: { echoCancellation: true, noiseSuppression: true }, video: { facingMode: "user" } };

function VideoRoom() {
    const router = useRouter();
    const { sessionId } = router.query;
    const { currentUser } = useAuth();

    const [stream, setStream] = useState(null)
    const [call, setCall] = useState();
    const [peer, setPeer] = useState();

    const remoteVideoRef = useRef();
    const localVideoRef = useRef();
  
    const handleCanPlayRemote = () => {
      remoteVideoRef.current.play();
    }
    const handleCanPlayLocal = () => {
      localVideoRef.current.play();
    }

    useEffect(() => {
        if (peer) {
            return () => {
                peer.disconnect();
                peer.destroy();
            }
        }
    }, [peer])

    function createToPeer() {
        let peer;
        import('peerjs').then(() => {
          peer = new Peer(currentUser.uid);
      
          peer.on('open', () => {
            socket.emit('joinroom', {userId: peerId, firstName:"MARK", sessionId:sessionId})
            setPeer(peer);
            setPeerInfo("Your id is " + peer.id);
          })
      
          peer.on('connection', (dataConnection) => {
          })
      
          peer.on('call', (call) => {
            setCallMessage('receiving call from ' + call.peer);
            // TODO change constraints to be audio only
            navigator.mediaDevices.getUserMedia(userMediaConfig)
              .then((localstream) => {
                  console.log("LOCAL STREAM", localstream)
                if (localstream && localVideoRef.current && !localVideoRef.current.srcObject) {
                    console.log("LOCAL REF", localVideoRef)
                  localVideoRef.current.srcObject = localstream;
                }
                setCall(call);
                // Answer the call with an A/V stream.
                call.answer(localstream);
      
                // Play the remote stream
                call.on('stream', (remoteStream) => {
                    console.log("REMOTE STREAM", remoteStream)
                  if (remoteStream && remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
                    remoteVideoRef.current.srcObject = remoteStream;
                  }
                });
      
                call.on('close', () => {
                  setCallMessage("The call has ended");
                  hangUp();
                });
      
                call.on('error', (error) => {
                  console.log(error);
                  hangUp();
                })
              })
              .catch(error => { console.log(error); });
          });

          socket.on('user-connected', userId => {

          });
      
          peer.on('disconnected', () => {
            setPeerInfo("peer desconnected");
            setPeer(null);
          });
      
          peer.on('close', () => {
            setPeerInfo("peer closed");
            setPeer(null);
          });
      
          peer.on('error', (error) => {
            console.log("peer error", error);
            setPeer(null);
          });
      
        }).catch(error => { console.log(error) });
    }

    function makeCall() {
        if (typeof window === "object") {
          if (sessionId === '') {
            setCallMessage('insert id to connect');
            return;
          }
      
          navigator.mediaDevices.getUserMedia(userMediaConfig)
            .then(function (localstream) {
    
              if (localstream && localVideoRef.current && !localVideoRef.current.srcObject) {
                localVideoRef.current.srcObject = localstream;
              }
      
              let thisCall = peer.call(sessionId, localstream);
              setCall(thisCall);
              thisCall.on('stream', function (remoteStream) {
                if (remoteStream && remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
                  remoteVideoRef.current.srcObject = remoteStream;
                }
                setCallMessage('Connected to ' + thisCall.peer);
              });
      
              thisCall.on('close', () => {
                setCallMessage("call closed");
                hangUp();
              });
      
              thisCall.on('error', (error) => {
                console.log("call error", error);
                hangUp();
              });
            }).catch(function (error) {
              console.log('Failed to get local stream', error);
            });
        }
    }

    const buildCall = () => {
        createPeer();
        makeCall()
    }

    function hangUp() {
        if (call) {
            call.close();
        }
        setCall(null)
        remoteVideoRef.current.srcObject = null;
    }
      
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
//                     setPeer(myPeer);
//                     socket.emit('joinroom', {userId: peerId, firstName:"MARK", sessionId:sessionId})
//                     console.log("PEERID", peerId, " ROOMID ", sessionId)
//                 })

//                 myPeer.on('call', call => { 

//                     navigator.mediaDevices.getUserMedia({
//                         video: true,
//                         audio: true
//                     }). then (stream => {
//                         const myVideo = document.createElement('video');
//                         myVideo.muted = true;
//                         myVideo.classList.add("video_me")
//                         addVideoStream(myVideo, stream, myVideoScreen)

// // When we join someone's room we will receive a call from them
//                         console.log("ANSWERING CALL", call, "   ", stream)
//                         call.answer(stream) // Stream them our video/audio

//                         const video = document.createElement('video');
//                         video.muted = true;
//                         video.classList.add("video_them")

//                         call?.on('stream', userVideoStream => { // When we recieve their stream
//                             addVideoStream(video, userVideoStream, themVideoScreen) // Display their video to ourselves
//                         })
//                     })
                    

//                     socket.on('user-connected', userId => { // If a new user connect, connect to them
//                         console.log("Socket user connected", userId);
//                         connectToNewUser(userId, stream) 
//                     })
                    
//                 })
            
//                 function connectToNewUser(userId, stream) { // This runs when someone joins our room
//                     console.log("CONNECTING TO NEW USER", userId, " ", stream, myPeer)
//                     const call = myPeer.call(userId, stream) // Call the user who just joined
//                     //Add their video
//                     console.log("CALLING", call)
//                     setCall(call);
//                     const video = document.createElement('video')
//                     video.muted = true;
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

//     const createPeer = () => {
//         import('peerjs').then(({ default: Peer }) => {
//             const myPeer = new Peer(currentUser.uid
//                 //, {
//                 // host: "localhost",
//                 // path: "/peerjs",
//                 // port: 3001
//             //}
//             );
//             const myVideoScreen = document.getElementById('video_me');
//             const themVideoScreen = document.getElementById('video_them');

//             myPeer.on('open', peerId => { // When we first open the app, have us join a room
//                 setPeer(myPeer);
//                 socket.emit('joinroom', {userId: peerId, firstName:"MARK", sessionId:sessionId})
//                 console.log("PEERID", peerId, " ROOMID ", sessionId)
//             })

//             myPeer.on('call', call => { 

//                 navigator.mediaDevices.getUserMedia({
//                     video: true,
//                     audio: true
//                 }). then (stream => {
//                     const myVideo = document.createElement('video');
//                     myVideo.muted = true;
//                     myVideo.classList.add("video_me")
//                     addVideoStream(myVideo, stream, myVideoScreen)

// // When we join someone's room we will receive a call from them
//                     console.log("ANSWERING CALL", call, "   ", stream)
//                     call.answer(stream) // Stream them our video/audio

//                     const video = document.createElement('video');
//                     video.muted = true;
//                     video.classList.add("video_them")

//                     call?.on('stream', userVideoStream => { // When we recieve their stream
//                         addVideoStream(video, userVideoStream, themVideoScreen) // Display their video to ourselves
//                     })
//                 })
                

//                 socket.on('user-connected', userId => { // If a new user connect, connect to them
//                     console.log("Socket user connected", userId);
//                     connectToNewUser(userId, stream) 
//                 })
                
//             })
        
//             function connectToNewUser(userId, stream) { // This runs when someone joins our room
//                 console.log("CONNECTING TO NEW USER", userId, " ", stream, myPeer)
//                 const call = myPeer.call(userId, stream) // Call the user who just joined
//                 //Add their video
//                 console.log("CALLING", call)
//                 setCall(call);
//                 const video = document.createElement('video')
//                 video.muted = true;
//                 video.classList.add("video_them")
//                 call?.on('stream', userVideoStream => {
//                     addVideoStream(video, userVideoStream, themVideoScreen)
//                 })
//                 //If they leave, remove their video
//                 call?.on('close', () => {
//                     video.remove()
//                 })
//             }

//             function addVideoStream (video, stream, container) {
//                 video.srcObject = stream;
//                 video.addEventListener('loadedmetadata', () => {
//                   video.play();
//                 })
//                 container.append(video);
//               }
            
//         });

//         myPeer.on('disconnected', () => {
//             setPeer(null);
//         });

//         myPeer.on('close', () => {
//             setPeer(null);
//         });

//         myPeer.on('error', (error) => {
//             console.log("peer error", error);
//             setPeer(null);
//         });
//     }

//     const createCall = () => {
        
//     }

//     };
    
//    const endCall = () => {
//         if (call) {
//             call.close();
//         };
//         setCall(null);
//         console.log("HANGING UP")
//        //socket.emit('')
//    }

    return (
        <div>
          {/* <div id="video_them" className="videoRoom_theirVideo" >

          </div>
          <div id="video_me" className="videoRoom_myVideo"> */}

          <div>
                <div>
                    <video ref={remoteVideoRef} onCanPlay={handleCanPlayRemote}  autoPlay playsInline muted />
                </div>
                <div>
                    <video ref={localVideoRef}  onCanPlay={handleCanPlayLocal} autoPlay playsInline muted />
                </div>
            </div>


          <button onClick={() => buildCall()}>Join</button>

          {/* </div > */}
          <div className="endCall">
          <button type="button" onClick={() => hangUp()} className="button_circle"><img src="/icons/call_end.png"/></button>
          </div>        
        </div>
    )
}

export default VideoRoom