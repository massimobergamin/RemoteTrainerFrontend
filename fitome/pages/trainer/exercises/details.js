import {  } from 'react';
import ExerciseDetails from '../../../components/exerciseDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedExercise } from '../../../redux/trainer';
import { useRouter } from 'next/router';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';

function Details() {
  const { selectedExercise } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <WorkoutsExercisesBar></WorkoutsExercisesBar>
      <div className="pageContainer workoutsExercises_flexCol">
        <button className="button" onClick={() => {
          dispatch(setSelectedExercise({}));
          router.push('/trainer/exercises');
          }}>Back</button>
        <ExerciseDetails exercise={selectedExercise}></ExerciseDetails>
        </div>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Details;
