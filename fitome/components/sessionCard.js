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

    function showButton() {
        let currentDate = Date.now();
        if (new Date(currentDate) >= new Date(session.startDate) && new Date(currentDate) <= new Date(session.endDate)) {
            return (<button type="button" className="button" onClick={joinCallHandler}>JOIN CALL</button>)
        } 
        return null;
    }

    return (
        <div className={`${class_name} sessionCard_contrainer`}>
            <button>Delete</button>
            <div className="sessionCard_left">
                {showProfilePicture()}
            </div>
            <div className="sessionCard_right">
                <div>{session.title}</div>
                <div>{`Session Time: ${Moment(session.startDate).format('LLL')}-${Moment(session.endDate).format('LT')}`}</div>
                {usertype==="trainer" ? 
                <div>Client: <span>{`${session.users[1].first_name} ${session.users[1].last_name}`}</span></div> 
                :
                <div>Trainer: <span>{`${session.users[0].first_name} ${session.users[0].last_name}`}</span></div>}
                {showButton()}
            </div>
            
        </div>
    )
}

export default sessionCard
