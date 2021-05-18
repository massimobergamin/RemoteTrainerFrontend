//USE TRAINER UID: EkNvm81E59bSBxQXFdQKe4Bh9D82
//matteo@hotmail.com password
//CLIENT: ygh0DKzWGOdK42Ito4yR6B1DSUu2

import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/contextAuth';
import { useSelector } from 'react-redux';
import { updateUser, getClients, getWorkout, postPlan } from '../redux/trainer';
import { useDispatch } from 'react-redux';
import NavigationTrainer from '../components/navigationBar/navigationTrainer'
import moment from 'moment';
import PlansBar from '../components/plansBar';
import { route } from 'next/dist/next-server/server/router';


//get list of workouts

const CreatePlanForm = () => {

  const { currentUser } = useAuth();
                
  const initialState = {
    trainer_uid: currentUser.uid,
    client_uid: "", //get from list of clients
    details: [],
    start_date: '',
    end_date: '',
  };
  
  const detailInitialState = {
    day: "",
    exercises: [],
    reps: [],
    sets: [],
    trainer_notes: "",
    client_notes: ""
  }
  
  const [detailState, setDetailState] = useState(detailInitialState)
  const [planState, setPlanState] = useState(initialState);
  const dispatch = useDispatch();

  //retrieves list of Trainer's clients
  useEffect(() => {
    dispatch(getClients(currentUser.uid))
    dispatch(getWorkout(currentUser.uid))
  }, [])
  
  const insertAt = (array, index, elem) => {
    const shallowArray = Object.assign(array);
    return shallowArray.splice(index, 1, elem)
  }

  const setReps = (e, index) => {
    console.log(planState)
    const updatedArrray = insertAt(detailState.reps, index, e.currentTarget.value);
    console.log(detailState.reps)
  }

  const setSets = (e, index) => {
    const updatedArrray = insertAt(detailState.sets, index, e.currentTarget.value);
    console.log(detailState.sets)
  }

  const { user, clients, workouts } = useSelector(state => state.trainer);

//*********************** */

const listWorkouts = () => {
  if (workouts) {
    return workouts.map((workout)=> {
      return <option key={workout.id} value={`${workout.title}`}></option>
    })
  }
  else return null
}

//client list will be a drop down option
//trainer can click the client and it will register that client to the plan


const listClients = () => {
  // console.log("CLIENTS", clients)
  // console.log("USER", user)'
    if (clients) {
      return clients.map((client)=> {
        return <option key={client.id} value={`${client.first_name} ${client.last_name}`}></option>
      })
    }
    else {
      alert('You have no clients. Please invite your clients using your invite code.')
    } 
  }
  
  const findValue = (value) => {
    for (let i=0; i<clients.length; i++) {
      console.log("CHECK HERE", clients)
      let name = clients[i].first_name+' '+clients[i].last_name;
      if (name===value){
        setPlanState({...planState, client_uid:clients[i].user_uid})
      }
      break;
    }
  }
  
  const findWorkoutValue = (value) => {
    console.log("VAL", value)
    for (let i=0; i<workouts.length; i++) {
      let name = workouts[i].title
      if (name===value){
        console.log(workouts[i])
        detailState.exercises.push(workouts[i])
        {showSeletedWorkout()}
      }
      break;
    }
  }
  const showSeletedWorkout = () => {
    if (detailState.exercises.length) {
      return detailState.exercises.map((exercise, index) => (
        <div>
          <h1>{exercise.title}</h1>
          <h6>Reps</h6>
          <input onChange={(e) => setReps(e, index)}/>
          <h6>Sets</h6>
          <input onChange={(e) => setSets(e, index)}/>
          </div>
      ))
    }
  }
  
  const handleDetailSubmit = (e) => {
    e.preventDefault();
    planState.details.push(detailState);
    setDetailState(detailInitialState)
  }
  const handlePlanSubmit = (e) => {
    e.preventDefault();
    dispatch(postPlan(planState));
    route.push('./clients')
  };

  const addDayButton = () => {
    if (detailState.day && detailState.exercises.length && detailState.reps.length && detailState.sets.length) {
      return <input className="button" type="submit" value="Add Day" onClick={e => handleDetailSubmit(e)}/>
    }
    else {
      return <button className="button" type="button" disabled>Add Day</button>
    }
  }

  const finalizeDayButton = () => {
    if (planState.client_uid && planState.details.length && planState.start_date && planState.end_date) {
      return <input className="button" type="submit" value="Finalize Plan" onClick={e => handlePlanSubmit(e)}/>
    }
    else  return <button className="button" type="button" disabled>Finalize Plan</button>
  }

  const getDate = (date) => {
    let dateVal = new Date(date);
    let day = dateVal.getDate().toString().padStart(2, "0");
    let month = (1 + dateVal.getMonth()).toString().padStart(2, "0");
    let inputDate = dateVal.getFullYear() + "-" + (month) + "-" + (day);
    return inputDate;
}

const deleteDay = (index) => {
  console.log(index)
  console.log(planState.details)
  planState.details.splice(index, 1)
}
  
  return (
    <div>
      <PlansBar></PlansBar>
      <form className="fullFormContainer">
        <label htmlFor="listOfClients">Select a Client:</label>
        
        <input list="clientList" onChange={(e)=>findValue(e.target.value)} id="listOfClients" name="listOfClients" />
        <datalist id="clientList" >
        {listClients()}
        </datalist>
        {/* </div> */}
        <div>
        </div>
        <p className="profileLabelInput">Start Date</p>
           <input type="date" name="start date" min={getDate(Date.now())} value={planState.start_date} onChange={(e) => {
            setPlanState({...planState, start_date:e.target.value})
           
          }} required/>
        <p className="profileLabelInput">End Date</p>
           <input placeholder="End Date" type="date"  min={getDate(moment(planState.start_date).add(1, 'days'))} disabled={planState.start_date === ''} name="end date" value={planState.end_date} 
           onChange={(e) => { if(e.target.value > planState.start_date) setPlanState({...planState, end_date:e.target.value})
           else alert("End date must be at least 1 day after start date")
          }}/>
        
        <p className="profileLabelInput">Day</p>
          <input type="date" placeholder="Day" onChange={(e) => {
            if(e.target.value >= planState.start_date && e.target.value <= planState.end_date)
            setDetailState({...detailState, day:e.target.value})
            else alert("This day is not within the selected plan dates")
          }
            }/>
        <div>
              <label htmlFor="listOfWorkoutss">Select a Workout:</label>
        <input list="workoutList" onChange={(e)=>findWorkoutValue(e.target.value)} id="listOfWorkouts" name="listOfWorkouts" />
        <datalist id="workoutList" >
        {listWorkouts()}
        </datalist>
        {showSeletedWorkout()}
        </div>
          
        <textarea placeholder="notes" value={detailState.trainer_notes} onChange={(e) => setDetailState({...detailState, trainer_notes:e.target.value})}/>
        
        {addDayButton()}
        
        {finalizeDayButton()}
      </form>
      {planState.details ? planState.details.map(day => (
        <div>
          <p>{day.day}</p>
          {day.exercises.map((exercise, index) => (
            <div>
              <button value={day.title} onClick={() => deleteDay(index)}>X
              <p>{exercise.title}</p>
              </button>
            </div>
          ))}
        </div>
      )) : null
      }
      {/* <NavigationTrainer></NavigationTrainer> */}
    </div>
  )
}

export default CreatePlanForm