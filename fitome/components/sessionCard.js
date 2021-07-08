import React from 'react';
import {useRouter} from 'next/router';
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteTrainerSession } from '../redux/trainer';
import { deleteClientSession, getSessionsFiltered } from '../redux/client';
import { useSelector } from 'react-redux';

function sessionCard({class_name, deleted, setDeleted, usertype, session}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const trainerInfo = useSelector(state => state.trainer);
    const clientInfo = useSelector(state => state.client);

    function joinCallHandler () {
        router.push(`/videoRoom/${session.meeting_id}`)
    }

    function showProfilePicture () {
        if (usertype === "trainer") {
            if (session.users[0].profile_picture) {
                return <img className="sessionCard_profilepicture" src={session.users[1].profile_picture} />
            }
            return <img className="sessionCard_profilepicture" src="/emptyprofile.png"/>
        } else {
            if (session.users[1].profile_picture) {
                return <img className="sessionCard_profilepicture" src={session.users[0].profile_picture} />
            }
            return <img className="sessionCard_profilepicture" src="/emptyprofile.png"/>
        }
    }

    function showButton() {
        let currentDate = Date.now();
        if (new Date(currentDate) >= new Date(session.startDate) && new Date(currentDate) <= new Date(session.endDate)) {
            return (<button type="button" className="button sessionCard_smallButton" style={{backgroundColor: "#ca6702"}} onClick={joinCallHandler}>Join</button>)
        }
        return null;
    };

    function deleteHandler () {
        if (usertype === 'trainer')
            dispatch(deleteTrainerSession({meeting_id: session.meeting_id, uid: trainerInfo.user.user_uid}))
                .then(() => setDeleted(true))
                .then(() => dispatch(getSessionsFiltered({uid: trainerInfo.user.user_uid, type:"trainer"})))
        else
            dispatch(deleteClientSession({meeting_id: session.meeting_id, uid: clientInfo.user.user_uid}))
                .then(() => setDeleted(true))
                .then(() => dispatch(getSessionsFiltered({uid: clientInfo.user.user_uid, type:"client"})));
    }

    return (
        <div className={`${class_name} sessionCard_container`}>
            <div className="sessionCard_left">
                {showProfilePicture()}
            </div>
            <div className="sessionCard_right">
                <div className="sessioncard_title">{session.title}</div>
                <div>{`${Moment.utc(session.startDate).format("LLL")}-${Moment(session.endDate).format('LT')}`}</div>
                {usertype==="trainer" ?
                <div><span className="exercise_subtitle">Client: </span>{`${session.users[1].first_name} ${session.users[1].last_name}`}</div>
                :
                <div><span className="exercise_subtitle">Trainer: </span>{`${session.users[0].first_name} ${session.users[0].last_name}`}</div>}
                <button value={session.meeting_id} onClick={deleteHandler} className="sessionCard_delete">X</button>
                {showButton()}
            </div>
        </div>
    )
}

export default sessionCard
