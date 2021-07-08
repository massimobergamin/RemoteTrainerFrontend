import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../firebase/contextAuth';
import { getSessionsFiltered } from '../../redux/client';
import SessionCard from '../../components/sessionCard';
import uuid from 'react-uuid';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import NavigationClient from '../../components/navigationBar/navigationClient';
import Loader from '../../components/loader';

function SessionList() {

    const router = useRouter();
    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    const sessions = useSelector(state => state.client.filteredSessions);
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(()=> {
        setLoading(true);
        if (currentUser.displayName === "trainer") {
            dispatch(getSessionsFiltered({uid:currentUser.uid, type:"trainer"}))
                .then(() => {
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else {
            dispatch(getSessionsFiltered({uid:currentUser.uid, type:"client"}))
              .then(() => setLoading(false))
              .catch(() => setLoading(false));
        }
    }, []);

    function showFirst () {
        if (sessions?.length == 0 || sessions == undefined) {
            return <div>
                    <div>No session available.</div>
                    {currentUser.displayName === "client" &&
                    <div>Please make a session with your trainer.</div>}
                </div>
        } else {
            return <SessionCard class_name="first" deleted={deleted} setDeleted={setDeleted} usertype={`${currentUser.displayName}`} session={sessions[0]} />
        }
    }

    function showRest () {
        if (sessions?.length <= 1) {
            return <div>No Upcoming Sessions Available.</div>
        } else {
            return sessions?.slice(1).map((session) => {
                return <SessionCard key={uuid()} class_name="rest" deleted={deleted} setDeleted={setDeleted} usertype={`${currentUser.displayName}`} session={session} />
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

    if (loading) {
        return (
          <div>
            <div className="loader_wrapper">
              <Loader/>
            </div>
            { currentUser.displayName==="trainer" ? (

            <NavigationTrainer/>
            ) :
            <NavigationClient/>
            }
          </div>
        )
    }

    return (
        <div>
            {sessions &&
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
            }
            { currentUser.displayName==="trainer" ? (

                <NavigationTrainer/>
            ) :
                <NavigationClient/>
            }
        </div>
    )
}

export default SessionList
