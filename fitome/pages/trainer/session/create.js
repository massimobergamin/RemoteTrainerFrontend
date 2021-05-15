import React, {useState, useEffect} from 'react'
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer'
import {useDispatch, useSelector} from 'react-redux'
import { getSessions, getClients } from '../../../redux/trainer';
import {useAuth} from '../../../firebase/contextAuth'
import {useRouter} from 'next/router';

function create() {
    const { currentUser } = useAuth();
    const router = useRouter();
    const trainer = useSelector(state => state.trainer);
    const dispatch = useDispatch();

    useEffect(()=> {
        console.log(currentUser)
        if (currentUser) {
            dispatch(getSessions("trainer", currentUser.uid));
            //user.user_uid));
            dispatch(getClients(currentUser.uid))
        }
    },[currentUser, router]);
    
    const listClients = () => {
        // console.log("CLIENTS", clients)
        // console.log("USER", user)'
        if (trainer.clients) {
        return trainer.clients.map((client)=> {
            console.log("CLIENT" , client)
            return <option key={client.id} value={`${client.first_name}`}></option>
        })
        }
        else {
            return <option value="Please invite your clients."></option>
        } 
    }



    return (
        <div>
        <div className="pageContainer">
            
            <h1>Create Training Session</h1>
            <form>
            <label htmlFor="sessionTitle">Session Purpose:</label>
            <input type="text" id="sessionTitle" name="sessionTitle" placeholder="Workout"/>
            <div>* Defaults to "Workout" if session purpose is blank.</div>
            <label htmlFor="listOfClients">Choose a Client:</label>
            <input list="clientList" id="listOfClients" name="listOfClients" />
            <datalist id="clientList">
                {listClients()}
            </datalist>
            <label htmlFor="startTime">Session Start Time:</label>
            <input type="datetime-local" id="startTime" name="startTime"/>
            <label htmlFor="endTime">Session End Time:</label>
            <input type="datetime-local" id="endTime" name="endTime"/>

            </form>
        </div>
            <NavigationTrainer />
        </div>
    )
}

export default create
