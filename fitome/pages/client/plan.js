import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getUser } from '../../redux/client';
import { useAuth } from '../../firebase/contextAuth';
import NavigationClient from '../../components/navigationBar/navigationClient';
import moment from 'moment';
import WorkoutDetails from '../../components/workoutDetails';
import Loader from '../../components/loader';

const Plan = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getUser(currentUser.uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const client = useSelector(state => state.client);

  function renderPlan () {
    if (client.plans.length) {
      for (let i = 0; i < client.plans.length; i++) {
        let plan = client.plans[i];
        const startDate = plan.start_date;
        const endDate = plan.end_date;
        const today = Date.now();
        if (moment(today).isBetween(startDate, endDate)) {
          let curPlan = plan;
          return (
            <div>
              <div className="clientplan_date">Beginning: {moment(startDate).format("dddd, MMMM Do YYYY")}</div>
              <div className="clientplan_date">Ending: {moment(endDate).format("dddd, MMMM Do YYYY")}</div>
              <div>
                {curPlan.details.map(day => (
                  <div className="plan_detail_breakdown">
                    <div className="clientplan_dates" key={day.id}>{moment(day.day).format("dddd, MMMM Do YYYY")}</div>
                    <WorkoutDetails key={day.day} workout={day}></WorkoutDetails>
                  </div>
                ))}
                </div>
            </div>
          );
        };
      };
    } else return <h2>You don't have a plan assigned to you right now.</h2>
    };

  if (loading) {
    return (
      <div>
        <div className="loader_wrapper">
          <Loader/>
        </div>
        <NavigationClient/>
      </div>
    )
  }

  return (
    <div>
      <div className="page_container">
      <h1>My Training Plan</h1>
      {renderPlan()}
      </div>
      <NavigationClient />
    </div>
  )
}

export default Plan;
