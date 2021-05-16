import React, {useState, useEffect} from 'react'
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer'
import {useDispatch, useSelector} from 'react-redux'
import { getClients } from '../../../redux/trainer';
import {useAuth} from '../../../firebase/contextAuth'
import {useRouter} from 'next/router';
import uuid from 'react-uuid';
import { postSession } from '../../../redux/trainer'

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
            //dispatch(getSessions("trainer", currentUser.uid));
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

    async function submitHandler (e) {
        e.preventDefault();
        let endDate = new Date(formState.startDate);
        endDate.setHours(formState.endDate.split(":")[0])
        endDate.setMinutes(formState.endDate.split(":")[1])
        let title = formState.title==="" ? "Workout" : formState.title;
        await dispatch(postSession({
            trainer_uid:currentUser.uid,
            client_uid:formState.client.user_uid,
            sessionData: {
                startDate: formState.startDate,
                endDate: endDate,
                meeting_id: formState.meeting_id,
                title: title,
            }
        }));
        router.push("/sessions")
    }

    const findValue = (value) => {
        for (let i=0; i<trainer.clients.length; i++) {
            let name = trainer.clients[i].first_name+' '+trainer.clients[i].last_name;
            console.log("NAME", trainer.clients[i], name)
            if (name===value){
                setFormState({...formState, client:trainer.clients[i]})
                break;
            }
        }
    }


    function getTime() {
        let sessionDate = new Date(formState.startDate);
        let hour  = sessionDate.getHours();
        let mins = sessionDate.getMinutes();
        return(hour+":"+mins)
    }

    function getDate () {
        let dateVal = new Date(Date.now());
        let day = dateVal.getDate().toString().padStart(2, "0");
        let month = (1 + dateVal.getMonth()).toString().padStart(2, "0");
        let hour = dateVal.getHours().toString().padStart(2, "0");
        let minute = dateVal.getMinutes().toString().padStart(2, "0");
        let sec = dateVal.getSeconds().toString().padStart(2, "0");
        let ms = dateVal.getMilliseconds().toString().padStart(3, "0");
        let inputDate = dateVal.getFullYear() + "-" + (month) + "-" + (day) + "T" + (hour) + ":" + (minute);
        return inputDate;
    }
    
    return (
        <div>
        <div className="pageContainer">
            <h1>Create Training Session</h1>
        
            <form className="sessionCreate_form" onSubmit={submitHandler}>
            <label className="sessionCreate_field" htmlFor="sessionTitle">Session Purpose:
                <input type="text" id="sessionTitle" name="sessionTitle" placeholder="Workout" onChange={(e)=>setFormState({...formState, title: e.target.value})}/>
                <div className="sessionForm_announcement">* Defaults to "Workout" if session purpose is blank.</div>
            </label>
            <label className="sessionCreate_field" htmlFor="listOfClients">Select a Client:
                <input list="clientList" onChange={(e)=>findValue(e.target.value)} id="listOfClients" name="listOfClients" />
                <datalist id="clientList" >
                    {listClients()}
                </datalist>
                </label>
            <label className="sessionCreate_field" htmlFor="startTime">Session Start Date:
                <input type="datetime-local" id="startTime" min={getDate()} onChange={(e)=>setFormState({...formState, startDate:e.target.value})} name="startTime"/>
            </label>
            <label className="sessionCreate_field" htmlFor="endTime">Session End Time:
                <input type="time" id="endTime" name="endTime"  disabled={formState.startDate===""} min={getTime()} max="23:59"
                onChange={(e)=>{
                    setFormState({...formState, endDate:e.target.value})
                }
                }/>
            </label>
            <div>
                <button type="submit" className="button createSessionButton"
                disabled={ Object.keys(formState.client).length===0 || formState.startDate==="" || formState.endDate===""}>Create Session</button>
            </div>
            </form>
        </div>
            <NavigationTrainer />
        </div>
    )
}

export default create
