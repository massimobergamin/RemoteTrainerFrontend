import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from '../../redux/client'
import { useAuth } from '../../firebase/contextAuth';
import NavigationClient from '../../components/navigationBar/navigationClient';
import moment from 'moment';
import WorkoutDetails from '../../components/workoutDetails';


// displays client's workout plan + exercises
const Plan = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(currentUser.uid));
  }, []);

  const client = useSelector(state => state.client);
  const curPlan = client.plans[0];
  const sched = client.plans[0].details;
  
  return (
    <div>
      <h1>{client.user.username}'s Training Plan</h1>
      <div>
        <div>Beginning: {moment(curPlan.start_date).format('LL')}</div>
        <div>Ending: {moment(curPlan.end_date).format('LL')}</div>
        <div className={''/* TODO: plan_details_container css */}>
          {sched.map((day) => (
            <div>
              <h3>{day.day}</h3>
              <WorkoutDetails key={day.day} workout={day}></WorkoutDetails>
            </div>
          ))}
        </div>
      </div>
      <NavigationClient />
    </div>
  )
}

export default Plan
