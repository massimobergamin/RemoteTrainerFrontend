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
import { useRouter } from 'next/router';

//get list of workouts

const CreatePlanForm = () => {
  const router = useRouter();
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
    workout: {},
    exercises: [],
    reps: [],
    sets: [],
    trainer_notes: "",
    client_notes: ""
  }

  const [detailState, setDetailState] = useState(detailInitialState)
  const [planState, setPlanState] = useState(initialState);
  const dispatch = useDispatch();
  const { user, clients, workouts } = useSelector(state => state.trainer);

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
    const updatedArray = insertAt(detailState.reps, index, e.currentTarget.value);
  }

  const setSets = (e, index) => {
    const updatedArray = insertAt(detailState.sets, index, e.currentTarget.value);
  }

//*********************** */
  const showSelectedWorkout = () => {
    if (detailState.exercises.length) {
      return detailState.exercises.map((exercise, index) => {
        return (
          <div className="createPlan_exContainer">
            <h2 className="exercise_title">{exercise.title}</h2>
            <div className="createPlan_setsReps">
              <div className="createPlan_reps">
                <label>Sets:</label>
                <input type="number" min="0" step="1" onChange={(e) => setSets(e, index)}/>
              </div>
              <div className="createPlan_reps">
                <label>Reps:</label>
                <input type="number" min="0" step="1" onChange={(e) => setReps(e, index)}/>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  const listWorkouts = () => {
    if (workouts) {
      return workouts.map((workout)=> {
        return <option key={workout.id} value={`${workout.title}`}></option>
      })
  }
  return null
}

//client list will be a drop down option
//trainer can click the client and it will register that client to the plan


  const listClients = () => {
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
      let name = clients[i].first_name+' '+clients[i].last_name;
      if (name===value){
        setPlanState({...planState, client_uid:clients[i].user_uid})
      }
      break;
    }
  }

  const findWorkoutValue = (value) => {
    for (let i=0; i<workouts.length; i++) {
      let name = workouts[i].title
      if (name===value){
        setDetailState({...detailState, workout:workouts[i], exercises:workouts[i].exercises});
        //setDetailState({...detailState, workout:workouts[i], exercises:detailState.exercises.concat(workouts[i].exercises)});
        break;
      }
    }
  }

  const handleDetailSubmit = (e) => {
    setPlanState({...planState, details: planState.details.concat(detailState)});
    let dropdown = document.getElementById("listOfClients");
    dropdown.selectedIndex=0;
    document.getElementById("day_date").value="";
    setDetailState(detailInitialState)
  }
  const handlePlanSubmit = (e) => {
    e.preventDefault();
    dispatch(postPlan(planState));
    router.push('./clients')
  };

  const addDayButton = () => {
    return <button className="button" style={{maxWidth: "50vw"}}
      disabled ={detailState.day==="" || !detailState.workout || detailState.reps.length===0 || detailState.reps.length===0}
      type="button"
      onClick={e => handleDetailSubmit(e)}>Add Workout Day</button>
  }

  const finalizeDayButton = () => {
      return <button className="button" style={{maxWidth: "50vw"}}
        type="button"
        disabled={planState.client_uid==="" || planState.details.length===0 || planState.start_date==="" || planState.end_date===""}
        value="Finalize Plan"
        onClick={e => handlePlanSubmit(e)}>Assign Schedule</button>
  }

  const getDate = (date) => {
    let dateVal = new Date(date);
    let day = dateVal.getDate().toString().padStart(2, "0");
    let month = (1 + dateVal.getMonth()).toString().padStart(2, "0");
    let inputDate = dateVal.getFullYear() + "-" + (month) + "-" + (day);
    return inputDate;
}

const showExercises = (exercises, reps, sets) => {
  return exercises.map((exercise, index)=> {
      return (
        <div>
          <div>Exercise #{index+1}: <span>{exercise.title}</span></div>
          <div>Sets: {sets[index]}   Reps:{reps[index]}</div>
        </div>
      )
  })
}

function deleteHandler(index) {
  setPlanState({...planState, details: planState.details.filter((_, i) => i !== index)})
}
  const showCards = () => {
    if (planState.details.length) {
      return planState.details.map((workout,index) =>{
        return (
          <div className="plan_card">
            <button type="button" onClick={()=>deleteHandler(index)}>X</button>
            <div><b>{workout.workout.title}</b></div>
            <div><b>{moment(workout.day).format('MMMM Do')}</b></div>
            {showExercises(workout.exercises, workout.reps, workout.sets)}
          </div>
        )
      })
    }
    return null;
  }

  return (
    <div >
      <form className="fullFormContainer">
        <label htmlFor="listOfClients">Select a Client:</label>

        <input className="createPlanInput" list="clientList" autoComplete="off" onChange={(e)=>findValue(e.target.value)} id="listOfClients" name="listOfClients" />
        <datalist id="clientList" >
        {listClients()}
        </datalist>
        <div>
        </div>
        <p className="planFormlabels">Start Date</p>
           <input className="createPlanInput" type="date" name="start date" min={getDate(Date.now())} value={planState.start_date} onChange={(e) => {
            setPlanState({...planState, start_date:e.target.value})

          }} required/>
        <p className="planFormlabels">End Date</p>
           <input className="createPlanInput" type="date"  min={getDate(moment(planState.start_date).add(1, 'days'))} disabled={planState.start_date === ''} name="end date" value={planState.end_date}
           onChange={(e) => { if(e.target.value > planState.start_date) setPlanState({...planState, end_date:e.target.value})
           else alert("End date must be at least 1 day after start date")
          }}/>

        <p className="planFormlabels">Day</p>
          <input
          className="createPlanInput"
          type="date"
            disabled = {planState.start_date==="" || planState.end_date===""}
            min={getDate(moment(planState.start_date))}
            max= {getDate(moment(planState.end_date))}
            id="day_date"
            onChange={(e) => setDetailState({...detailState, day:e.target.value})}
          />

              <label className="planLabelCreate" htmlFor="listOfWorkouts">Select a Workout:</label>

        <input className="createPlanInput" list="workoutList" autoComplete="off" onSelect={(e)=>findWorkoutValue(e.target.value)} id="listOfWorkouts" name="listOfWorkouts" />
        <datalist id="workoutList" >
        {listWorkouts()}
        </datalist>
        {showSelectedWorkout()}
        <p className="planFormlabels">Notes</p>
        <textarea className="noteInput" value={detailState.trainer_notes} onChange={(e) => setDetailState({...detailState, trainer_notes:e.target.value})}/>

        {addDayButton()}

        {finalizeDayButton()}
      </form>
      {showCards()}
    </div>
  )
}

export default CreatePlanForm