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
import Peer from 'peerjs';
import { useRouter } from 'next/router'

function VideoRoom() {
    const myPeer = new Peer(); // create peer element for current user
    const router = useRouter();
    const { id } = router.query;
    const [stream, setStream] = useState(null)
    const videoRef = useRef();
    const videoRef2 = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }). then (stream => {
            console.log(stream);
            videoRef.current.srcObject = stream;
            
            myPeer.on('call', call => { // When we join someone's room we will receive a call from them
                call.answer(stream) // Stream them our video/audio
                call.on('stream', userVideoStream => { // When we recieve their stream
                    videoRef.current.srcObject = userVideoStream; // Display their video to ourselves
                })
            })

            socket.on('joinRoom', userId => { // If a new user connect
                connectToNewUser(userId, stream) 
            })
            
        })
    },[])
    return (
        <div>
            <video autoPlay
            ref={videoRef}
            className="video_me" 
            muted={true}></video>
            <video autoPlay
            ref={videoRef2}
            className="video_them" 
            muted={true}></video>
        </div>
    )
}

export default VideoRoom

