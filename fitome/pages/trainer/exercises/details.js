import {  } from 'react';
import ExerciseDetails from '../../../components/exerciseDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedExercise } from '../../../redux/trainer';
import { useRouter } from 'next/router';

function Details() {
  const { selectedExercise } = useSelector(() => state.trainer);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <button onClick={() => {
        dispatch(setSelectedExercise({}));
        router.push('/trainer/exercises');
        }}>Back</button>
      <ExerciseDetails exercise={selectedExercise}></ExerciseDetails>
    </div>
  )
}

export default Details;
