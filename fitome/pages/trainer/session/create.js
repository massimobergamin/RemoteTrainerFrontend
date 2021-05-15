import React, {useState, useEffect} from 'react'
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer'
import {useDispatch, useSelector} from 'react-redux'
import { getSessions, getClients } from '../../../redux/trainer';
import {useAuth} from '../../../firebase/contextAuth'
import {useRouter} from 'next/router';
import uuid from 'react-uuid';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

function create() {
    const { currentUser } = useAuth();
    const router = useRouter();
    const trainer = useSelector(state => state.trainer);
    const dispatch = useDispatch();
    const [currentTime, setCurrentTime] = useState(null);

    const initialState = {
        title: "Workout",
        client: {},
        startDate: "",
        endDate: "",
        meeting_id: uuid(),
    }
    const[formState, setFormState] = useState(initialState)

    useEffect(()=> {
        console.log(currentUser)
        if (currentUser) {
            dispatch(getSessions("trainer", currentUser.uid));
            dispatch(getClients(currentUser.uid))
        }
    },[currentUser, router]);
    
    const listClients = () => {
        // console.log("CLIENTS", clients)
        // console.log("USER", user)'
        if (trainer.clients) {
            return trainer.clients.map((client)=> {
                console.log("CLIENT" , client)
                return <option key={client.id} value={`${client.first_name} ${client.last_name}`}></option>
            })
        }
        else {
            alert('You have no clients. Please invite your clients using your invite code.')
        } 
    }

    function submitHandler () {
        console.log("submit")
        //console.log("CLIENT  FINAL ",client)
        console.log(formState);
        console.log(new Date(formState.endDate))
    }

    const findValue = (value) => {
        console.log("VALUE", value)
        for (let i=0; i<trainer.clients.length; i++) {
            let name = trainer.clients[i].first_name+' '+trainer.clients[i].last_name;
            console.log("NAME", trainer.clients[i], name)
            if (name===value){
                console.log("TRUE")
                setFormState({...formState, client:trainer.clients[i]})
                break;
            }
        }
    }

    function getDate () {
        //let currentDate = (new Date(Date.now()))
        var dateVal = new Date(Date.now());
        var day = dateVal.getDate().toString().padStart(2, "0");
        var month = (1 + dateVal.getMonth()).toString().padStart(2, "0");
        var hour = dateVal.getHours().toString().padStart(2, "0");
        var minute = dateVal.getMinutes().toString().padStart(2, "0");
        var sec = dateVal.getSeconds().toString().padStart(2, "0");
        var ms = dateVal.getMilliseconds().toString().padStart(3, "0");
        var inputDate = dateVal.getFullYear() + "-" + (month) + "-" + (day) + "T" + (hour) + ":" + (minute) + ":" + (sec) + "." + (ms);
        console.log("DATE", dateVal, ": ",inputDate)
        return inputDate;
    }
    
    return (
        <div>
            {getDate()}
        <div className="pageContainer">
            <h1>Create Training Session</h1>
            <form>
            <label htmlFor="sessionTitle">Session Purpose:</label>
            <input type="text" id="sessionTitle" name="sessionTitle" placeholder="Workout"/>
            <div>* Defaults to "Workout" if session purpose is blank.</div>
                <label htmlFor="listOfClients">Select a Client:</label>
                <input list="clientList" onChange={(e)=>findValue(e.target.value)} id="listOfClients" name="listOfClients" />
                <datalist id="clientList" >
                    {listClients()}
                </datalist>
            <label htmlFor="startTime">Session Start Time:</label>
            <input type="datetime-local" id="startTime" min={getDate()} onChange={(e)=>setFormState({...formState, startDate:e.target.value})} name="startTime"/>
            <label htmlFor="endTime">Session End Time:</label>
            <input type="time" id="endTime" name="endTime" 
            onChange={(e)=>{
                console.log(e.target.value)
                setFormState({...formState, endDate:e.target.value})
            }
            }/>
            <button type="button" onClick={submitHandler} className="button"
            disabled={ Object.keys(formState.client).length===0 || formState.startDate==="" || formState.endDate===""}>Create Session</button>
            </form>
        </div>
            <NavigationTrainer />
        </div>
    )
}

export default create
