import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/contextAuth'
import { useSelector } from 'react-redux';
import UploadImageForm from './uploadImageForm';
import { updateUser, getClients } from '../redux/trainer';
import { useDispatch } from 'react-redux';

//get list of clients in a drop down menu
//once selected, send that client uid
//get list of exercises
//get list of workouts

const CreatePlanForm = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);

  //retrieves list of Trainer's clients
  useEffect(() => {
    const getClientList = async () => {
      dispatch(getClients(currentUser.uid))
    }
    clientList.push(getClientList);
  })

  //client list will be a drop down option
  //trainer can click the client and it will register that client to the plan
  const clientList = []
  const toggle = () => setOpen(!open);
  
  const initialState = {
    trainer_uid: currentUser.uid,
    client_uid: "", //get from list of clients
    details: [],
    start_date: 0,
    end_date: 0,
  };

  const detailInitialState = {
    day: "",
    exercises: [],
    reps: [],
    sets: []
  }


  const [detailState, setDetailState] = useState(detailInitialState)
  const [planState, setPlanState] = useState(initialState);
  const { user } = useSelector(state => state.trainer);

  const handleDetailSubmit = (e) => {
    e.preventDefault();
    planState.details.push(detailState);
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setPlanState((previousState) => ({
      ...previousState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(currentUser.uid, planState.client_uid, planState));
  };

  return (
    <div>
      <form>
        <div
          role="button"
          onKeyPress={() => toggle(!open)}
          onClick={() => toggle(!open)}
        >
          <div>
            <a href="#">
            <p
            value={planState.client_uid}
            type="text"
            name="client"
            onChange={onChange}
            required
            autoComplete="off"
            >{ !planState.client ? (
            open ? 'Close' : 'Choose Client'
            ) : planState.client
            }
            </p>
            </a>
          </div>
          <div>
            { open ? (
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
           <input placeholder="Start Date"
          type="text" 
          name="start dat"
          value={planState.start_date}
          onChange={(e) => setPlanState({...planState, start_date:e.target.value})}/>
           <input placeholder="End Date"
          type="text" 
          name="end date"
          value={planState.end_date}
          onChange={(e) => setPlanState({...planState, end_date:e.target.value})}/>
          <form>
            <input placeholder="Day" onChange={(e) => setDetailState({...detailState, day:e.target.value})}/>
            <input placeholder="exercise" onChange={(e) => setDetailState({...detailState, day:e.target.value})}/>
            <input placeholder="reps" onChange={(e) => setDetailState({...detailState, reps:e.target.value})}/>
            <input placeholder="sets" onChange={(e) => setDetailState({...detailState, sets:e.target.value})}/>
            <input type="submit" value="addDay" onClick={e => handleDetailSubmit(e)}/>
          </form>
          <input type="submit" value="createPlan" onClick={e => handleSubmit(e)}/>
      </form>
      <p>{planState.client_uid}</p>
      <p>Strt Date</p>
      <p>{planState.start_date}</p>
      <p>End Date</p>
      <p>{planState.end_date}</p>
      <p>Details</p>
      <p>{planState.details}</p>
    </div>
  )
}

export default CreatePlanForm