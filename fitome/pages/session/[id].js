import React, {useState} from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket'

function SessionDetailPage () {

    const router = useRouter();
    const { id } = router.query;
    const [roomActive, setRoomActive] = useState(false)

    useEffect(() => {
        socket.emit ('isRoomActive', {sessionId}, (res) => {
            
        })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default SessionDetailPage

