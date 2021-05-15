import { current } from 'immer';
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from '../../redux/client'
import { useAuth } from '../../firebase/contextAuth';


// displays client's workout plan 
const Plan = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(currentUser.uid));
  }, []);

  const client = useSelector(state => state.client);
  console.log(client);
  
  return (
    <div>
      <h1>Client Plan</h1>
      {client.user.username}
    </div>
  )
}

export default Plan
