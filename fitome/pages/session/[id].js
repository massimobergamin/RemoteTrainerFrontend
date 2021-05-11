import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket'
import {withRoom} from '../../../mocks'
import Moment from 'moment'

function SessionDetailPage () {

    const router = useRouter();
    const { id } = router.query;
    const { currentUser } = useAuth();
    const [roomActive, setRoomActive] = useState(false)
    const [session, setSession] = useState(null);

    useEffect(() => {
        //axios get then .then
        setRoomActive(withRoom.in_use);
        setSession(withRoom);
    }, [router])

    function joinCallHandler () {
        console.log("joining")
        //emit
        socket.emit('joinRoom', {userId: currentUser.uid, firstName: firstName, roomId: session.id}); //get firstName from redux
    }

    function startCallHandler () {
        console.log("starting")
        //emit
        socket.emit('createNewRoom', {userId: currentUser.uid, firstName: firstName}); //get firstName from redux
    }

    function showButton () {
        if (roomActive===true) {
            return <button className="button" type="button" onClick={joinCallHandler}>JOIN CALL</button>
        } else {
            return <button className="button" type="button" onClick={startCallHandler}>START CALL</button>
        }
    }

    return (
        <div>
            <h1>Your Next Training Session:</h1>
            <h3>Session with <span>{session.client_uid}</span></h3>
            <p>{Moment(session.startDate).format('LLL')}</p>
            {showButton()}
        </div>
    )
}

export default SessionDetailPage

