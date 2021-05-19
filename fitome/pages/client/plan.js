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
  console.log('client: ', client);

  const handleClick = () => {
    
  }

  function renderPlan () {
    
    if (client.plans) {
      // console.log('client plans: ', client.plans);
      for (let i = 0; i < client.plans.length; i++) {
        let plan = client.plans[i];
        const startDate = plan.start_date
        const endDate = plan.end_date
        const today = Date.now();
        if (moment(today).isBetween(startDate, endDate)) {
          let curPlan = plan;
          // console.log('curPlan: ', curPlan);
          return (
            <div>
              <div>Beginning: {moment(startDate).format("dddd, MMMM Do YYYY")}</div>
              <div>Ending: {moment(endDate).format("dddd, MMMM Do YYYY")}</div>
              <div>
                {curPlan.details.map(day => (
                  <div>
                    <h2 key={day.id}>{moment(day.day).format("dddd, MMMM Do YYYY")}</h2>
                    <button>Add Notes</button>
                    <WorkoutDetails key={day.day} workout={day}></WorkoutDetails> 
                  </div>
                ))}
                </div>
            </div>
          );
        };
      };
    };
    };


  return (
    <div>
      <div className="page_container">
      <h1>{client.user.username}'s Training Plan</h1>
      {renderPlan()}
      <NavigationClient />
      </div>
    </div>
  )
}

export default Plan
