import React, {useEffect, useState, useRef} from 'react'
// import Peer from 'peerjs';
import { useRouter } from 'next/router'
import {useAuth} from '../../firebase/contextAuth'
import {socket} from '../../lib/socket'
import TimerOverlay from '../../components/timerOverlay';


function VideoRoom() {
    const router = useRouter();
    const { currentUser } = useAuth();
    const [stream, setStream] = useState(null);
    const { sessionId } = router.query;
    const [them, setThem] = useState({})

    
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
                const myVideoScreen = document.getElementById('video_me');
                const themVideoScreen = document.getElementById('video_them');

                myPeer.on('open', peerId => { // When we first open the app, have us join a room
                    socket.emit('joinroom', {userId: peerId, firstName:"MARK", sessionId:sessionId})
                    console.log("PEERID", peerId, " ROOMID ", sessionId)
                })

                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                }). then (stream => {
                    const myVideo = document.createElement('video');
                    myVideo.muted = true;
                    myVideo.classList.add("video_me")
                    setStream(stream)
                    addVideoStream(myVideo, stream, myVideoScreen)

                    myPeer.on('call', call => { // When we join someone's room we will receive a call from them
                        console.log("ANSWERING CALL", call, "   ", stream)
                        call.answer(stream) // Stream them our video/audio
                        const video = document.createElement('video');
                        //video.muted = true;
                        video.classList.add("video_them")
                        call.on('stream', userVideoStream => { // When we recieve their stream
                            addVideoStream(video, userVideoStream, themVideoScreen) // Display their video to ourselves
                        })
                    })
                    

                    socket.on('user-connected', userId => { // If a new user connect, connect to them
                        console.log("Socket user connected", userId);
                        connectToNewUser(userId, stream) 
                    })

                    socket.on('call-ended', res => {
                        myPeer.disconnect();
                        const themVideo = document.getElementById('video_them');
                        themVideo.remove();
                        console.log("MYBIGSTREAM", stream.getTracks())
                        stream.getTracks()[0].stop()
                        stream.getTracks()[1].stop()
                        router.push('/')
                    })
                    
                })
            
                function connectToNewUser(userId, stream) { // This runs when someone joins our room
                    console.log("CONNECTING TO NEW USER", userId, " ", stream, myPeer)
                    const call = myPeer.call(userId, stream) // Call the user who just joined
                    //Add their video
                    console.log("CALLING", call)
                    const video = document.createElement('video')
                    //video.muted = true;
                    video.classList.add("video_them")
                    call.on('stream', userVideoStream => {
                        addVideoStream(video, userVideoStream, themVideoScreen)
                    })
                    //If they leave, remove their video
                    call.on('close', () => {
                        video.remove()
                    })
                }

                function addVideoStream (video, stream, container) {
                    video.srcObject = stream;
                    video.addEventListener('loadedmetadata', () => {
                      video.play();
                    })
                    container.append(video);
                  }
                
            });
        }
    },[currentUser])
    
   function hangUp () {
       console.log("HANGING UP", stream.getTracks())
       stream.getTracks()[0].stop()
       stream.getTracks()[1].stop()
       setStream(null)
       socket.emit('hang-up', currentUser.uid)
       router.push("/")
   }

    return (
        <div>
          <div id="video_them" className="videoRoom_theirVideo" >

          </div>
          <div id="video_me" className="videoRoom_myVideo" >

          </div>
          <div className="endCall">
          <button type="button" onClick={() => hangUp()} className="button_circle"><img src="/icons/call_end.png"/></button>
          <div className="timer_container">
            <TimerOverlay />
          </div>
          </div>
        </div>
    )
}
 
export default VideoRoom