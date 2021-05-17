import React from 'react';
import {useRouter} from 'next/router';
import Moment from 'moment';

function sessionCard({class_name, usertype, session}) {

    const router = useRouter();

    function joinCallHandler () {
        router.push(`/videoRoom/${session.meeting_id}`)
    }

    function showProfilePicture () {
        if (usertype === "trainer") {
            if (session.users[0].profilepicture) {
                return <img className="sessionCard_profilepicture" src={session.users[0].profile_picture} />
            }
            return <img className="sessionCard_profilepicture" src="/emptyprofile.png"/>
        } else {
            if (session.users[1].profilepicture) {
                return <img className="sessionCard_profilepicture" src={session.users[1].profile_picture} />
            }
            return <img className="sessionCard_profilepicture" src="/emptyprofile.png"/>
        }
    }

    function showTime() {
        console.log(session, new Date(session.endDate).getTime())
    }

    return (
        <div className={`${class_name} sessionCard_contrainer`}>
            <div className="sessionCard_left">
                {showProfilePicture()}
            </div>
            <div className="sessionCard_right">
                {usertype==="trainer" ? 
                <div>Client: <span>{`${session.users[1].first_name} ${session.users[1].last_name}`}</span></div> 
                :
                <div>Trainer: <span>{`${session.users[0].first_name} ${session.users[0].last_name}`}</span></div>}
                {showTime()}
            </div>
            <button onClick={joinCallHandler}>JOIN CALL</button>
        </div>
    )
}

export default sessionCard
