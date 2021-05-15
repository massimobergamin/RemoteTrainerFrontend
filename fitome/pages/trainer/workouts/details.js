import {  } from 'react';
import WorkoutDetails from '../../../components/workoutDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWorkout } from '../../../redux/trainer';
import { useRouter } from 'next/router';

function Details() {
  const { selectedWorkout } = useSelector(() => state.trainer);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <button onClick={() => {
        dispatch(setSelectedWorkout({}));
        router.push('/trainer/workouts');
        }}>Back</button>
      <WorkoutDetails workout={selectedWorkout}></WorkoutDetails>
    </div>
  )
}

export default Details;
