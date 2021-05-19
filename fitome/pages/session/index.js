import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux'
import {useAuth} from '../../firebase/contextAuth'
import {getSessionsFiltered} from '../../redux/client'
import SessionCard from '../../components/sessionCard';
import uuid from 'react-uuid'
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import NavigationClient from '../../components/navigationBar/navigationClient';

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
                <div className="workout_addworkout" onClick={(e) => {
                    e.preventDefault();
                    router.push('/trainer/session/create')
                  }}><span className="workout_addworkout_span">+ </span>Session</div>

            )
        }
        return null;
    }

    return (
        <div>
            <div className="page_container">
                {showButton()}
                <div className="sessionList1">
                    <div className="session_list">Next Session:</div>
                    {showFirst()}
                </div>
                <div className="sessionList2">
                    <div className="session_list">Upcoming Sessions:</div>
                    {showRest()}
                </div>
            </div>
            { currentUser.displayName==="trainer" ? (

                <NavigationTrainer/>
            ) :
                <NavigationClient/>
            }
        </div>
    )
}

export default SessionList
