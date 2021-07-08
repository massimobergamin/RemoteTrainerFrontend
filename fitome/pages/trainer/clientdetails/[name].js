import { useSelector } from 'react-redux';
import moment from 'moment';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import { useRouter } from 'next/router';
import uuid from 'react-uuid';

const ClientDetail = () => {
  const { user, plans } = useSelector(state => state.client);
  const recentPlans = plans.filter(plan => Date.parse(plan.end_date) >= Date.now());
  const router = useRouter();

  return (
    <div>
    <div className="page_container">
      <div className="workout_addworkout" onClick={(e) => {
          e.preventDefault();
          router.push('../clients')
        }}><span className="workout_addworkout_span">{"< "}</span>Back</div>
      <h1>{user.first_name + ' ' + user.last_name}</h1>
      {user.profile_picture ?
        <img src={user.profile_picture} className="profilePic"/>
        : null }
      {recentPlans.length ? recentPlans.map(plan => (
        <div className="planCard trainer_clientview" key={plan.id}>
          <p className="planHeader">Plan:</p>
          <p className="planHeaderDate">{moment(plan.start_date).format('MMM DD') + "-" + moment(plan.end_date).format('MMM DD')}</p>
          {plan.details ? plan.details.map(detail => (
            <div className="single_card_container" key={uuid()}>
              <p className="dayTitle">{"Day: " + moment(detail.day).format('MMM DD')}</p>
              <div className="planContainer">
                <div className="exerciseTitleContainer">
              <p className="trainerclientview_detaillabel">Exercises</p>
                  {detail.exercises.map(exercise => (
                    <div key={uuid()}>
                      <p>{exercise.title}</p>
                    </div>
                  ))}
                </div>
                <div className="setrepContainer">
                  <div className="detailContainer">
                    <p className="trainerclientview_detaillabel">Sets</p>
                    {detail.sets.map(set => (
                      <div key={uuid()}>
                      <p>{set}</p>
                    </div>
                    ))}
                  </div>
                  <div className="detailContainer">
                  <p className="trainerclientview_detaillabel">Reps</p>
                  {detail.reps.map(rep => (
                    <div key={uuid()}>
                      <p>{rep}</p>
                    </div>
                  ))}
                  </div>
                </div>
                </div>
             <div><b>Notes:</b> {detail.trainer_notes}</div>
            </div>
          )) : null }
        </div>
      )
      )
      :
      <div className="page_subtitle">Assign {user.first_name} a plan!</div>
    }
      <a href="../createplan">
      <button className="button_workout">Create Plan</button>
      </a>
    </div>
      <NavigationTrainer/>
    </div>
  )
}

export default ClientDetail;