// import React from 'react'
// import Peer from 'peerjs';
// import { useRouter } from 'next/router'

// function videoRoom() {
//     const router = useRouter();
//     const { id } = router.query;

//     let myVideoStream;
//     const myPeer = new Peer(undefined, {
//         path: '/peerjs',
//         host: '/',
//         port: '443'
//       })
//     return (
//         <div className={videoCall_videoGrid}>
//             <video muted="true"></video>
//         </div>
//     )
// }

// export default videoRoom

import React, {useEffect, useState, useRef} from 'react'
// import Peer from 'peerjs';
import { useRouter } from 'next/router'
import {useAuth} from '../../firebase/contextAuth'
import {socket} from '../../lib/socket'

function VideoRoom() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const [stream, setStream] = useState(null)
    // const videoRef = useRef();
    // const videoRef2 = useRef();
    const { sessionId } = router.query;
    // const myPeer = new Peer(trainer_uid, {
    //     host: "localhost",
    //     path: "/peerjs",
    //     port: 3001
    // }); // create peer element for current user
    
    useEffect(() => {
        if (currentUser) {
            import('peerjs').then(({ default: Peer }) => {
                const myPeer = new Peer(currentUser.uid
                    //, {
                    // host: "localhost",
                    // path: "/peerjs",
                    // port: 3001
                //}
                );
                const videoScreen = document.getElementById('video-screen');

                myPeer.on('open', peerId => { // When we first open the app, have us join a room
                    socket.emit('joinroom', {userId: peerId, firstName:"MARK", sessionId:sessionId})
                    console.log("PEERID", peerId, " ROOMID ", sessionId)
                })

                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }). then (stream => {
                    //console.log(stream);
                    //videoRef.current.srcObject = stream;
                    const myVideo = document.createElement('video');
                    myVideo.muted = true;
                    myVideo.classList.add("video_me")
                    addVideoStream(myVideo, stream)

                    myPeer.on('call', call => { // When we join someone's room we will receive a call from them
                        console.log("ANSWERING CALL", call, "   ", stream)
                        call.answer(stream) // Stream them our video/audio
                        const video = document.createElement('video');
                        video.muted = true;
                        call.on('stream', userVideoStream => { // When we recieve their stream
                            //videoRef.current.srcObject = userVideoStream; // Display their video to ourselves
                            addVideoStream(video, userVideoStream)
                        })
                    })
                    

                    socket.on('user-connected', userId => { // If a new user connect, connect to them
                        console.log("Socket user connected", userId);
                        connectToNewUser(userId, stream) 
                    })
                    
                })
            
                function connectToNewUser(userId, stream) { // This runs when someone joins our room
                    console.log("CONNECTING TO NEW USER", userId, " ", stream, myPeer)
                    const call = myPeer.call(userId, stream) // Call the user who just joined
                    //Add their video
                    console.log("CALLING", call)
                    const video = document.createElement('video')
                    video.muted = true;
                    call.on('stream', userVideoStream => {
                        console.log("hello")
                        addVideoStream(video, userVideoStream)
                    })
                    // If they leave, remove their video
                    // call.on('close', () => {
                    //     videoRef2.remove()
                    // })
                }

                function addVideoStream (video, stream) {
                    //console.log("video: ", video)
                    video.srcObject = stream;
                    video.addEventListener('loadedmetadata', () => {
                      video.play();
                    })
                    videoScreen.append(video);
                  }
                
            });
        }
    },[currentUser])
    
   

    return (
        <div>
            {/* <video autoPlay
                ref={videoRef}
                className="video_me" 
                muted={true}>
            </video>
            <video autoPlay
                ref={videoRef2}
                className="video_them" 
                muted={true}>
            </video> */}
            <div id="video-screen" >

          </div>
        </div>
    )
}

// export async function getServerSideProps(context) {
//     //api call
//     return {
//       props: {
//           trainer_uid: "123456"
//       }, // will be passed to the page component as props
//     }
//   }

export default VideoRoom

