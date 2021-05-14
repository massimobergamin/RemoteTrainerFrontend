import React, {useState, useEffect} from 'react'
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer'
import {useDispatch, useSelector} from 'react-redux'
import { getSessions, getClients } from '../../../redux/trainer';
import {useAuth} from '../../../firebase/contextAuth'

function create() {
    const { currentUser } = useAuth();
    const { user, clients } = useSelector(state => state.trainer);
    const dispatch = useDispatch();

    useEffect(()=> {
        //console.log("userId", user.user_uid);
        dispatch(getSessions("trainer", currentUser.uid));
        //user.user_uid));
        dispatch(getClients(user.user_uid))
    });
    
    const listClients = () => {
        console.log("CLIENTS", clients)
        console.log("USER", user)
        //return clients.map((client)=> console.log(client))
        //return <option value={`${client.first_name} ${client.last_name}`}></option>
    }



    return (
        <div>
        <div className="pageContainer">
            <h1>Create Training Session</h1>
            <form>
                <label for="sessionTitle">Session Purpose:</label>
            <input type="text" id="sessionTitle" name="sessionTitle" placeholder="Workout"/>
            <div>* Defaults to "Workout" if session purpose is blank.</div>
            <label for="listOfClients">Choose a Client:</label>
            <input list="clientList" id="listOfClients" name="listOfClients" />
            <datalist id="clientList">
                {listClients()}
            </datalist>
            <label for="startTime">Session Start Time:</label>
            <input type="datetime-local" id="startTime" name="startTime"/>
            <label for="endTime">Session End Time:</label>
            <input type="datetime-local" id="endTime" name="endTime"/>

            </form>
        </div>
            <NavigationTrainer />
        </div>
    )
}

export default create
