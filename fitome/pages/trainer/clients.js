import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, getClients } from '../../redux/trainer';
import { getUser } from '../../redux/client';
import { useAuth } from '../../firebase/contextAuth';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { useRouter } from 'next/router';
import Loader from '../../components/loader';


const Clients = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getUserById(currentUser.uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    dispatch(getClients(currentUser.uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const { clients } = useSelector(state => state.trainer);

  const clientDetails = (uid, value) => {
    setLoading(true);
    dispatch(getUser(uid))
      .then(() => {
        setLoading(false);
        router.push(`./clientdetails/${value.first_name + value.last_name}`);
      }
      )
      .catch(() => setLoading(false));
  }

  const onChangeClient = (e) => {
    const { name, value } = e.target;
    clientDetails(value.user_uid, value);
  }

  const clientList = () => {
    if (clients.length) {
      return clients.map((client)=> {
        return <button className="button clients_button" key={client.user_uid} onClick={() => onChangeClient({ target: { name: "client", value: client } })}>{client.first_name + ' ' + client.last_name}</button>
      })
    }
    else {
      return <h2>You have no clients. Please invite your clients using your invite code.</h2>
    }
  }

  if (loading) {
    return (
      <div>
        <div className="loader_wrapper">
          <Loader/>
        </div>
        <NavigationTrainer/>
      </div>
    )
  }

  return (
    <div>
      <div className="page_container">
      <div className="workout_addworkout" onClick={(e) => {
          e.preventDefault();
          router.push('/trainer/createplan')
        }}><span className="workout_addworkout_span">+ </span>Plan</div>
      <h1>Client List</h1>
        <div className="clients_list">
      {clientList()}
        </div>
      </div>
      <NavigationTrainer/>
    </div>
  )
}

export default Clients;
