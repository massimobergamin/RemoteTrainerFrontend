import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux'
import {useAuth} from '../../firebase/contextAuth'
import {getSessionsFiltered} from '../../redux/client'
import SessionCard from '../../components/sessionCard';
import uuid from 'react-uuid'
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
            return sessions.slice(1).map((session) => {
                return <SessionCard key={uuid()} class_name="rest" usertype={`${currentUser.displayName}`} session={session} />
            })
        }

    }

    function showButton () {
        if (currentUser.displayName === "trainer") {
            return (
                <button className="button" 
                type="button"
                onClick={()=>router.push('/trainer/session/create')}
                >New Session
                </button>
            )
        }
        return null;
    }

    return (
        <div>
        <div className="page_container">
            {showButton()}
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
