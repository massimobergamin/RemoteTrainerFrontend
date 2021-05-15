import {  } from 'react';
import WorkoutDetails from '../../../components/workoutDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWorkout } from '../../../redux/trainer';
import { useRouter } from 'next/router';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';

function Details() {
  const { selectedWorkout } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <WorkoutsExercisesBar></WorkoutsExercisesBar>
      <div className="pageContainer">
        <button className="button" onClick={() => {
          dispatch(setSelectedWorkout({}));
          router.push('/trainer/workouts');
          }}>Back</button>
        <WorkoutDetails workout={selectedWorkout}></WorkoutDetails>
      </div>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Details;
