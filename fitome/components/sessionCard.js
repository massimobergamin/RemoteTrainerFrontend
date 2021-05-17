import React from 'react'
import {useRouter} from 'next/router';

function sessionCard({class_name, usertype, session}) {

    const router = useRouter();

    function joinCallHandler () {
        router.push(`/videoRoom/${session.meeting_id}`)
    }

    return (
        <div className={class_name}>
            <div className="sessionCard_left">
                {console.log(session)/* <img className="sessionCard_profilepicture" 
                src={usertype==="trainer" ? session.users[0].profile_picture : session.users[1].profile_picture} 
                /> */}
            </div>
            <div className="sessionCard_right">
                {usertype==="trainer" ? 
                <div>Client: <span>{`${session.users[1].first_name} ${session.users[1].last_name}`}</span></div> 
                :
                <div>Trainer: <span>{`${session.users[0].first_name} ${session.users[0].last_name}`}</span></div>}
            </div>
            <button onClick={joinCallHandler}>JOIN CALL</button>
        </div>
    )
}

export default sessionCard
