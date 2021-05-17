import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux'
import {useAuth} from '../../firebase/contextAuth'
import {getSessionsFiltered} from '../../redux/client'
import SessionCard from '../../components/sessionCard';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';


function SessionList() {

    const router = useRouter();
    const dispatch = useDispatch();
    const {currentUser} = useAuth();
    const sessions = useSelector(state=> state.client.filteredSessions)

    useEffect(()=> {
        if (currentUser.displayName==="trainer") {
            dispatch(getSessionsFiltered({uid:currentUser.uid, type:"trainer"}))
        } else {
            dispatch(getSessionsFiltered({uid:currentUser.uid, type:"client"}))
        }
    },[router]);

    function showFirst () {
        console.log(sessions);
        if (sessions?.length===0) {
            return <div><div>No session Available.</div><div>Please make a session with your trainer.</div></div>
        } else {
            return <SessionCard class_name="first" usertype={`${currentUser.displayName}`} session={sessions[0]} />
        }
    }

    function showRest () {
        if (sessions.length <= 1) {
            return <div>No Upcoming Sessions Available.</div>
        } else {
            return <SessionCard class_name="rest" usertype={`${currentUser.displayName}`} session={sessions[1]} />
        }

    }

    return (
        <div>
        <div className="page_container">
            <div className="sessionList1"> 
                Next Session:
                {showFirst()}
            </div>
            <div className="sessionList2">
                Upcoming Sessions:
                {showRest()}
            </div>
        </div>
        <NavigationTrainer/>
        </div>
    )
}

export default SessionList
