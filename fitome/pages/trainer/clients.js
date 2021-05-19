import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUserById, getClients } from '../../redux/trainer'
import { getUser } from '../../redux/client'
import { useAuth } from '../../firebase/contextAuth';
import NavigationClient from '../../components/navigationBar/navigationClient';
import PlansBar from '../../components/plansBar';
import moment from 'moment';
import WorkoutDetails from '../../components/workoutDetails';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { useRouter } from 'next/router';


const Clients = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getUserById(currentUser.uid));
    dispatch(getClients(currentUser.uid))
  }, []);

  const [selectedClient, setSelectedClient] = useState('')

  const { clients } = useSelector(state => state.trainer);
  
  const clientDetails = (uid) => {
     dispatch(getUser(uid))
  }
  const { user } = useSelector(state => state.client);

  const onChangeClient = (e) => {
    const { name, value } = e.target;
    clientDetails(value.user_uid)
    router.push(`./clientdetails/${value.first_name + value.last_name}`)
  }

  const clientList = () => {
    if (clients) {
      return clients.map((client)=> {
        return <button className="button" onClick={() => onChangeClient({ target: {name: "client", value: client} })}>{client.first_name + ' ' + client.last_name}</button>
      })
    }
    else {
      alert('You have no clients. Please invite your clients using your invite code.')
    } 
  }

 
  return (
    <div>
      <h1>Client List</h1>
      {clientList()}   
      <NavigationTrainer/>
    </div>
  )
}

      // <label htmlFor="listOfClients">Select a Client:</label>
      //   <input list="clientList" onChange={(e)=>findValue(e.target.value)} id="listOfClients" name="listOfClients" />
      //   <datalist id="clientList" >
      //   </datalist>
export default Clients
