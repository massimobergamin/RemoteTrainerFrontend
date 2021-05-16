//USE TRAINER UID: EkNvm81E59bSBxQXFdQKe4Bh9D82
//matteo@hotmail.com password
//CLIENT: ygh0DKzWGOdK42Ito4yR6B1DSUu2

import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/contextAuth';
import { useSelector } from 'react-redux';
import { updateUser, getClients, getWorkout, postPlan } from '../redux/trainer';
import { useDispatch } from 'react-redux';
import moment from 'moment';


//get list of workouts

const CreatePlanForm = () => {

  //MOCK
  const mock = [             
    {
        id: 25,
        trainer_uid: "sdhk89",
        title: "Arms",
        createdAt: "2021-05-11T00:42:59.312Z",
        updatedAt: "2021-05-11T00:42:59.555Z",
        userId: 1,
        exercises: [
            {
                id: 2,
                trainer_uid: null,
                title: "Bicep Curl",
                type: "common",
                description: "blah blah, blah blah",
                media: null,
                muscle_group: "Bicep",
                benefits: null,
                createdAt: "2021-05-10T19:35:06.544Z",
                updatedAt: "2021-05-10T19:35:06.544Z",
                userId: null,
                workout_exercise: {
                    createdAt: "2021-05-11T00:42:59.572Z",
                    updatedAt: "2021-05-11T00:42:59.572Z",
                    workoutId: 25,
                    exerciseId: 2
                }
            },
            {
                id: 3,
                trainer_uid: null,
                title: "Hammer Curl",
                type: "common",
                description: "blah blah, blah blah",
                media: null,
                muscle_group: "Bicep",
                benefits: null,
                createdAt: "2021-05-10T19:35:11.169Z",
                updatedAt: "2021-05-10T19:35:11.169Z",
                userId: null,
                workout_exercise: {
                    createdAt: "2021-05-11T00:42:59.584Z",
                    updatedAt: "2021-05-11T00:42:59.584Z",
                    workoutId: 25,
                    exerciseId: 3
                }
            }
        ]
    }
]
  const { currentUser } = useAuth();
                
  const initialState = {
    trainer_uid: currentUser.uid,
    client_uid: "", //get from list of clients
    details: [],
    start_date: '',
    end_date: '',
  };
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
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
  const [openClients, setOpenClients] = useState(false);
  const [openWorkouts, setOpenWorkouts] = useState(false);
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
    const updatedArrray = insertAt(detailState.reps, index, e.currentTarget.value);
    console.log(detailState.reps)
  }

  const setSets = (e, index) => {
    const updatedArrray = insertAt(detailState.sets, index, e.currentTarget.value);
    console.log(detailState.sets)
  }

  const { user, clients, workouts } = useSelector(state => state.trainer);

//*********************** */
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

  //client list will be a drop down option
  //trainer can click the client and it will register that client to the plan
  
  const toggleClient = () => setOpenClients(!openClients);
  
  const toggleWorkout = () => setOpenWorkouts(!openWorkouts)
  
  
  console.log("detail state", detailState)
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setPlanState((previousState) => ({
      ...previousState,
      [name]: value,
    }))
  }
  
  const onChangeWorkout = (e) => {
    const { name, value } = e.target;
    value.exercises.map(ex => {
      console.log(ex)
      detailState.exercises.push(ex)
    })
  }
  
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
  
  const handleDetailSubmit = (e) => {
    e.preventDefault();
    planState.details.push(detailState);
    setDetailState(detailInitialState)
  }
  const handlePlanSubmit = (e) => {
    e.preventDefault();
    dispatch(postPlan(planState));
  };
  
  return (
    <div>
      <form className="fullFormContainer">
        <div
          role="button"
          onKeyPress={() => toggleClient(!openClients)}
          onClick={() => toggleClient(!openClients)}
        >
        <label htmlFor="listOfClients">Select a Client:</label>
        <input list="clientList" onChange={(e)=>findValue(e.target.value)} id="listOfClients" name="listOfClients" />
        <datalist id="clientList" >
        {listClients()}
        </datalist>
        </div>
        <div>
        </div>
        <p className="label">Start Date</p>
           <input type="datetime-local" name="start date" value={planState.start_date} onChange={(e) => setPlanState({...planState, start_date:e.target.value})}/>
        <p className="label">End Date</p>
           <input placeholder="End Date" type="datetime-local"  name="end date" value={planState.end_date} onChange={(e) => setPlanState({...planState, end_date:e.target.value})}/>
        <p className="label">Day</p>
          <input type="datetime-local" placeholder="Day" onChange={(e) => setDetailState({...detailState, day:e.target.value})}/>
          <div role="button" onKeyPress={() => toggleWorkout(!openWorkouts)} onClick={() => toggleWorkout(!openWorkouts)}>
            <div>
              <a href="#">
              <p className="button" value={planState.start_date} type="text" name="client" onChange={onChange} required autoComplete="off">
              { 
              openWorkouts ? 'Close' : 'Select Workout'
              }
              </p>
              </a>
            </div>
              <div>
              { openWorkouts ? (
              <ul>
              {workouts.map((workout, index) => (
              <li key={index}>
              <button type="button" onClick={() => onChangeWorkout({ target: {name: "exercises", value: workout} })}>
                {workout.title}
              </button>
              </li>
              ))}
              </ul>
              ) : null
              }
            </div>
          </div>

          <div className="detailsContainer">
          {showSeletedWorkout()}
            <div>
            </div>
            <input placeholder="notes" onChange={(e) => setDetailState({...detailState, trainer_notes:e.target.value})}/>
          </div>
          <input className="button" type="submit" value="Add Day" onClick={e => handleDetailSubmit(e)}/>
     
      
          <input className="button" type="submit" value="Finalize Plan" onClick={e => handlePlanSubmit(e)}/>
      </form>
    </div>
  )
}

export default CreatePlanForm