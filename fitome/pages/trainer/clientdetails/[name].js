import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
const ClientDetail = () => {

  const { user, plans } = useSelector(state => state.client);
  const recentPlans = plans.filter(plan => Date.parse(plan.end_date) >= Date.now());

  
  const displayDetails = recentPlans[0]?.details
  
  return (
    <div>

    <div className="page_container">
      <h1>{user.first_name + ' ' + user.last_name}</h1>
      {user.profile_picture ?
        <img src={user.profile_picture} className="profilePic"/>
        : null }
      {recentPlans.length ? recentPlans.map(plan => (
        <div className="planCard trainer_clientview">
          <p className="planHeader">Plan:</p>
          <p className="planHeaderDate">{moment(plan.start_date).format('MMM DD') + "-" + moment(plan.end_date).format('MMM DD')}</p>
          {displayDetails ? displayDetails.map(detail => (
            <div className="single_card_container">
              {"Day: " + moment(detail.day).format('MMM DD')}
              <div className="planContainer">
                <div className="exerciseTitleContainer">  
              <p className="trainerclientview_detaillabel">Exercises</p>
                  {detail.exercises.map(exercise => (
                    <div>
                      <p>{exercise.title}</p>
                    </div>
                  ))}
                </div>
                <div className="setrepContainer">
                  <div className="detailContainer">
                    <p className="trainerclientview_detaillabel">sets</p>
                    {detail.sets.map(set => (
                      <div>
                      <p>{set}</p>
                    </div>
                    ))}
                  </div>
                  <div className="detailContainer">
                  <p className="trainerclientview_detaillabel">reps</p>
                  {detail.sets.map(set => (
                    <div>
                      <p>{set}</p>
                    </div>
                  ))}
                  </div>
                </div>
                </div>
             <p>{detail.client_notes}</p>
            </div>
          )) : null } 
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
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default ClientDetail