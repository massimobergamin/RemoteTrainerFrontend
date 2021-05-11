import React, {useState} from 'react'
import { useRouter } from 'next/router'
import {socket} from '../../lib/socket'

function SessionDetailPage () {

    const router = useRouter();
    const { id } = router.query;
    const [roomCreated, setRoomCreated] = useState(false)

    useEffect(() => {
    
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default SessionDetailPage

