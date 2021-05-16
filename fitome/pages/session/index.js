import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux'
import {useAuth} from '../../firebase/contextAuth'
import {getSessionsTrainer} from '../../redux/trainer'
import {getSessionsClient} from '../../redux/client'


function SessionList() {

    const router = useRouter();
    const dispatch = useDispatch();
    const {currentUser} = useAuth();
    const trainerSessions = useSelector(state=> state.trainer.sessions)
    const clientSessions = useSelector(state => state.client.sessions)
    const [partner, setPartner] = useState({});

    useEffect(()=> {
        console.log(currentUser)
        if (currentUser.displayName==="trainer") {
            dispatch(getSessionsTrainer(currentUser.uid)).then(()=> {
                console.log("USEEEFFECT", trainerSessions);
                filterSessions("trainer")
            })
        } else {
            dispatch(getSessionsClient(currentUser.uid)).then(()=>filterSessions("client"))
        }
    },[router]);

    function filterSessions(type) {
        let sessionList = (type==="trainer" ? trainerSessions : clientSessions);
        console.log("FILTER", sessionList);
        
    }

    const firstPost = (session, type) => {
        if (currentUser.displayName==="trainer") {
            let partner = dispatch(getUser(session.client_uid))
        }
        if (currentUser.displayName==="client") {
            let partner = dispatch(getUserById(session.trainer_uid))
        }

        return (
        <div className="sessionList_card">
            {type==="trainer" ? 
            <div>Client: <span>{`${partner.first_name} ${partner.last_name}`}</span></div> 
            :
            <div>Trainer: </div>}
            
        </div>
        )
    }

    function showFirst () {
        if (currentUser.displayName==="trainer" && trainerSessions.length > 0) {
            return 
        } else if (currentUser.displayName==="client" && clientSessions.length>0) {
            return 
        } else {
            return <div className="sessionList_card">No Sessions Available</div>
        }
    }

    function showRest () {

    }

    return (
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
    )
}

export default SessionList
