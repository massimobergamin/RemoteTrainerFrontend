import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
const ClientDetail = () => {

  const { user, plans } = useSelector(state => state.client);
  const recentPlans = plans.filter(plan => Date.parse(plan.end_date) >= Date.now());
  console.log("CHECK HERE", recentPlans)

  const renderPlan = () => {
    return (recentPlans.length ? recentPlans.map(plan => {
      <div className="planCard">
        {console.log(plan)}
        <p>{plan.client_uid}</p>
        <p>Test</p>
      </div>
    })
    : 
    <p>Assign {user.first_name} a plan!</p>)
  }

  return (
    <div>
      <h1>{user.first_name + ' ' + user.last_name}</h1>
      {recentPlans.length ? recentPlans.map(plan => (
        <div className="planCard">
          {console.log(plan)}
          <p>{moment(plan.end_date).format('MMM DD')}</p>
          <p>Test</p>
        </div>
      )
      )
      : 
      <p>Assign {user.first_name} a plan!</p>
      }
      <a href="../createplan">
      <button className="button">Create Plan</button>
      </a>
    </div>
  )
}

export default ClientDetail