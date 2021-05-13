import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket'
import {useAuth} from '../../firebase/contextAuth'
import {withRoom} from '../../../mocks'
import Moment from 'moment'

function SessionDetailPage () {

    const router = useRouter();
    const { id } = router.query;
    const { currentUser } = useAuth();
    const [session, setSession] = useState(null);

    useEffect(() => {
        socket.emit('isRoomActive', {userId:currentUser.uid, sessionId: id}, (response) => {
            console.log(response)
            setSession(response)
        })
    }, [router])

    function joinCallHandler () {
        console.log("joining")
        //emit
        // socket.emit('joinRoom', {userId: currentUser.uid, firstName: "MARK", roomId: session.id}); //get firstName from redux
        router.push(`/videoRoom/${id}`)
    }

    function startCallHandler () {
        console.log("starting")
        //emit
        socket.emit('createNewRoom', {userId: currentUser.uid, firstName: "MARK"}); //get firstName from redux
        router.push(`/videoRoom/${id}`);
    }

    function showButton () {
        if (session?.in_use===true) {
            return <button className="button" type="button" onClick={joinCallHandler}>JOIN CALL</button>
        } else {
            return <button className="button" type="button" onClick={startCallHandler}>START CALL</button>
        }
    }

    return (
        <div>
            <h1>Your Next Training Session:</h1>
            <h3>Session with <span>{session?.client_uid}</span></h3>
            <p>{Moment(session?.startDate).format('LLL')}</p>
            {showButton()}
        </div>
    )
}

export default SessionDetailPage

