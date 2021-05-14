import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/contextAuth'
import { useSelector } from 'react-redux';
import { updateUser, getClients, getWorkout } from '../redux/trainer';
import { useDispatch } from 'react-redux';
import moment from 'moment'


//get list of workouts

const CreatePlanForm = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [openClients, setOpenClients] = useState(false);
  const [openWorkouts, setOpenWorkouts] = useState(false);

  //retrieves list of Trainer's clients
  useEffect(() => {
    const getClientList = async () => {
      dispatch(getClients(currentUser.uid))
    }
    clientList.push(getClientList);

    const getWorkoutList = async () => {
      dispatch(getWorkout(currentUser.uid))
    }
    workoutList.push(getWorkoutList)
  })

  //client list will be a drop down option
  //trainer can click the client and it will register that client to the plan
  const clientList = [];
  const workoutList = [];

  const toggleClient = () => setOpenClients(!openClients);

  const toggleWorkout = () => setOpenWorkouts(!openWorkouts)
  
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
    exercises: {},
    reps: "",
    sets: "",
    trainer_notes: "",
    client_notes: ""
  }


  const [detailState, setDetailState] = useState(detailInitialState)
  const [planState, setPlanState] = useState(initialState);
  const { user } = useSelector(state => state.trainer);

  const handleDetailSubmit = (e) => {
    e.preventDefault();
    planState.details.push(detailState);
    console.log(planState.details)
    console.log(detailState)
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setPlanState((previousState) => ({
      ...previousState,
      [name]: value,
    }))
  }

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    console.log(planState)
    dispatch(updateUser(currentUser.uid, planState.client_uid, planState));
  };

  return (
    <div>
      <form className="fullFormContainer">
        <div
          role="button"
          onKeyPress={() => toggleClient(!openClients)}
          onClick={() => toggleClient(!openClients)}
        >
          <div className="clientListButton">
            <a href="#">
            <p className="button" value={planState.client_uid} type="text" name="client" onChange={onChange} required autoComplete="off">
            { !planState.client ? (
            openClients ? 'Close' : 'Choose Client'
            ) : planState.client
            }
            </p>
            </a>
          </div>
          <div className="clientDropdownList">
            { openClients ? (
            <ul>
            {clientList.map((client, index) => (
            <li key={index}>
            <button type="button" onClick={() => onChange({ target: {name: "client", value: client.user_uid} })}>
              {client.first_name}
            </button>
            </li>
            ))}
            </ul>
            ) : null
            }
          </div>
        </div>
        <div>
        </div>

        <p className="label">Start Date</p>
           <input type="datetime-local" name="start date" value={planState.start_date} onChange={(e) => setPlanState({...planState, start_date:e.target.value})}/>
        <p className="label">End Date</p>
           <input placeholder="End Date" type="datetime-local"  name="end date" value={planState.end_date} onChange={(e) => setPlanState({...planState, end_date:e.target.value})}/>
          {/* <form> */}
        <p className="label">Day</p>
          <input type="datetime-local" placeholder="Day" onChange={(e) => setDetailState({...detailState, day:e.target.value})}/>
          {/* <form> */}
          <div role="button" onKeyPress={() => toggleWorkout(!openWorkouts)} onClick={() => toggleWorkout(!openWorkouts)}>
            <div>
              <a href="#">
              <p className="button" value={planState.client_uid} type="text" name="client" onChange={onChange} required autoComplete="off">
              { !planState.client ? (
              openClients ? 'Close' : 'Select Workout'
              ) : planState.client
              }
              </p>
              </a>
            </div>
              <div>
              { openWorkouts ? (
              <ul>
              {workoutList.map((workout, index) => (
              <li key={index}>
              <button type="button" onClick={() => onChange({ target: {name: "workout", value: workout} })}>
                {workout}
              </button>
              </li>
              ))}
              </ul>
              ) : null
              }
            </div>
          </div>
          <div className="detailsContainer">
            <input placeholder="Reps: 0-0-0" onChange={(e) => setDetailState({...detailState, reps:e.target.value})}/>
            <input placeholder="Sets: 0-0-0" onChange={(e) => setDetailState({...detailState, sets:e.target.value})}/>
            <input placeholder="notes" onChange={(e) => setDetailState({...detailState, trainer_notes:e.target.value})}/>
          </div>
          {/* </form> */}
          <input className="button" type="submit" value="Add Day" onClick={e => handleDetailSubmit(e)}/>
          {/* </form> */}
      {/* <p>{planState.client_uid}</p> */}
      <div className="planSchema">
        <div className="planSchemaColumns">
      <p >Start Date</p>
      <p>{moment(planState.start_date).format('MMMM Do YYYY')}</p>
        </div>
        <div className="planSchemaColumns">
      <p>End Date</p>
      <p>{moment(planState.end_date).format('MMM Do YYYY')}</p>
        </div>
      </div>
      <p>Details</p>
      {planState.details.length ? (
        <ul>
          {planState.details.map((detail, index) => {
            <li key={index}>
            {detail}
            </li>
          })}
        </ul>
      ) : null }
          <input className="button" type="submit" value="Finalize Plan" onClick={e => handlePlanSubmit(e)}/>
      </form>
    </div>
  )
}

export default CreatePlanForm