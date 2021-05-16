import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from '../../redux/client'
import { useAuth } from '../../firebase/contextAuth';
import NavigationClient from '../../components/navigationBar/navigationClient';


// displays client's workout plan + exercises
const Plan = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(currentUser.uid));
  }, []);

  const client = useSelector(state => state.client);
  console.log('client: ', client);
  
  return (
    <div>
      <h1>{client.user.username}'s Training Plan</h1>
      <NavigationClient />
    </div>
  )
}

export default Plan
