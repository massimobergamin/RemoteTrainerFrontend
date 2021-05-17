import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from '../../redux/client'
import { useAuth } from '../../firebase/contextAuth';
import NavigationClient from '../../components/navigationBar/navigationClient';
import moment from 'moment';
import WorkoutDetails from '../../components/workoutDetails';


// displays client's workout plan + exercises
const Clients = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(currentUser.uid));
  }, []);

  const { clients } = useSelector(state => state.trainer);
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
      let name = clients[i].first_name+' '+clients[i].last_name;
      if (name===value){
        console.log("hello")
        //setPlanState({...planState, client_uid:clients[i].user_uid})
      }
      break;
    }
  }

  return (
    <div>
      <label htmlFor="listOfClients">Select a Client:</label>
        <input list="clientList" onChange={(e)=>findValue(e.target.value)} id="listOfClients" name="listOfClients" />
        <datalist id="clientList" >
        {listClients()}
        </datalist>
      <NavigationClient />
    </div>
  )
}

export default Clients
