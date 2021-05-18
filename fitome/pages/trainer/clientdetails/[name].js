import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
const ClientDetail = () => {

  const { user, plans } = useSelector(state => state.client);
  const recentPlans = plans.filter(plan => Date.parse(plan.end_date) >= Date.now());

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

  console.log("RECENT", recentPlans)

  const displayDetails = recentPlans[0].details
  console.log("DEETS", displayDetails)

  return (
    <div>
      <h1>{user.first_name + ' ' + user.last_name}</h1>
      {user.profile_picture ?
        <img src={user.profile_picture} className="profilePic"/>
      : null }
      {recentPlans.length ? recentPlans.map(plan => (
        <div className="planCard">
          {console.log(plan)}
          <p>plan ends</p>
          <p>{moment(plan.end_date).format('MMM DD')}</p>
          {displayDetails.map(detail => (
            <div>
              {moment(detail.day).format('MMM DD')}
              <div className="planContainer">
                <div className="exerciseTitleContainer">  
                  {detail.exercises.map(exercise => (
                    <div>
                      <p>{exercise.title}</p>
                    </div>
                  ))}
                </div>
                <div className="setrepContainer">
                  <div className="detailContainer">
                    <p>sets</p>
                    {detail.sets.map(set => (
                    <div>
                      <p>{set}</p>
                    </div>
                    ))}
                  </div>
                  <div className="detailContainer">
                  <p>reps</p>
                  {detail.sets.map(set => (
                    <div>
                      <p>{set}</p>
                    </div>
                  ))}
                  </div>
                </div>
                </div>
             
            </div>
          ))}
         
        </div>
      )
      )
      : 
      <p>Assign {user.first_name} a plan!</p>
      }
      <a href="../createplan">
      <button className="button">Create Plan</button>
      </a>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default ClientDetail