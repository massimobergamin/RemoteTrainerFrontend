import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getWorkout, setSelectedWorkout } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';
import Loader from '../../../components/loader';

function Workouts() {
  const router = useRouter();
  const { workouts } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getWorkout(currentUser.uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [])

  if (loading) return <Loader/>;

  return (
    <>
      <WorkoutsExercisesBar landingpage1={"workouts_on"} landingpage2={"workouts_off"}/>
      <div className="page_container_workout">
        <div className="workout_addworkout" onClick={(e) => {
          e.preventDefault();
          router.push('/trainer/workouts/create')
        }}><span className="workout_addworkout_span">+ </span>Workout</div>
        {workouts[0] ? workouts.map(workout =>
          <div key={workout.id} className="workoutsExercises_largeCard">
            
            <div className="workout_title">{workout.title}</div>
            <div className="workoutsExercises_scroll">
              {workout.exercises && workout.exercises.map(exercise =>
                <div key={exercise.id} className="workoutsExercises_cards">
                    {exercise.media ?
                    <div className="workout_video">
                      <video id="Exercise_Video" width="176" height="176" controls muted loop={true}>
                          <source src={exercise.media} type="video/mp4"/>
                          Your browser does not support HTML5 video.
                      </video>
                      </div> :
                    <img src="/noVid.png" width="176" height="176"></img>}
                  <div>{exercise.title}</div>
                </div>)}
              </div>
              <button className="button_workout" onClick={() => {
              setLoading(true);
              dispatch(setSelectedWorkout(workout))
              setLoading(false);
              router.push('/trainer/workouts/details');
            }}>View Details</button>
          </div>) : <h2>Looks like you don't have any workouts.</h2>}
        </div>
        <NavigationTrainer></NavigationTrainer>
    </>
  )
}

export default Workouts;
