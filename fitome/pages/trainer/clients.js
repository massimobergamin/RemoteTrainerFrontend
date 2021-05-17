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
  console.log(clients);

  return (
    <div>
    
      <NavigationClient />
    </div>
  )
}

export default Clients
