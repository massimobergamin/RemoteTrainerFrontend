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
      <div className="page_container">
          <div className="workout_addworkout" onClick={(e) => {
          e.preventDefault();
          dispatch(setSelectedExercise({}));
          router.push('/trainer/exercises')
        }}><span className="workout_addworkout_span">{"< "}</span>Back</div>
        <div classNAme="workoutsExercises_flexCol">
        <ExerciseDetails exercise={selectedExercise}></ExerciseDetails>
        </div>
        </div>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Details;
