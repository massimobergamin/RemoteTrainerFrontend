import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWorkout, setSelectedWorkout } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';

function Workouts() {
  const router = useRouter();
  const { workouts } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch(getWorkout(currentUser.uid));
  }, [])

  return (
    <div>
      <WorkoutsExercisesBar></WorkoutsExercisesBar>
      <div className="pageContainer">
        <button className="button" onClick={() => router.push('/trainer/workouts/create')}>New Workout</button>
        {workouts[0] ? workouts.map(workout =>
          <div key={workout.id} className="workoutsExercises_card">
            <button className="button" onClick={() => {
              dispatch(setSelectedWorkout(workout));
              router.push('/trainer/workouts/details');
            }}>View Details</button>
            <div>{workout.title}</div>
            <div className="workoutsExercises_scroll">
              {workout.exercises && workout.exercises.map(exercise =>
                <div key={exercise.id} className="workoutsExercises_scrollItems">
                  <div>{exercise.title}</div>
                    {exercise.media ?
                      <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
                          <source src={exercise.media} type="video/mp4"/>
                          Your browser does not support HTML5 video.
                      </video> :
                    <img src="/noVid.png" width="176" height="176"></img>}
                </div>)}
              </div>
          </div>) : <h2>Looks like you don't have any workouts.</h2>}
        </div>
        <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Workouts;
