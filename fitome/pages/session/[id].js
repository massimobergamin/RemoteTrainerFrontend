import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket'
import {withRoom} from '../../../mocks'

function SessionDetailPage () {

    const router = useRouter();
    const { id } = router.query;
    const [roomActive, setRoomActive] = useState(false)
    const [session, setSession] = useState(null);

    useEffect(() => {
        //axios get then .then
        setRoomActive(withRoom.in_use);
        setSession(withRoom);
    }, [])

    function joinCallHandler () {
        console.log("joining")
        //emit
    }

    function startCallHandler () {
        console.log("starting")
        //emit
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
            {showButton()}
        </div>
    )
}

export default SessionDetailPage

