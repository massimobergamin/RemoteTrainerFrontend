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
  console.log(client.plans);

  let curPlan;
  let sched;

  if (client.plans) {
    curPlan = client.plans[7];
    sched = client.plans[7].details;
  }


  return (
    <div>
      <h1>{client.user.username}'s Training Plan</h1>
      <div>
        <div>Beginning: {client.plans ? moment(curPlan.start_date).format('LL') : null}</div>
        <div>Ending: {client.plans ? moment(curPlan.end_date).format('LL') : null}</div>
        <div className={''/* TODO: plan_details_container css */}>
          {client.plans ? sched.map((day) => (
            <div>
              <h2 key={day.id}>{day.day !== '' ? moment(day.day).format("dddd, MMMM Do YYYY") : null}</h2>
              <WorkoutDetails key={day.day} workout={day}></WorkoutDetails>
            </div>
          )) : null}
        </div>
      </div>
      <NavigationClient />
    </div>
  )
}

export default Plan
