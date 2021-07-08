import { useState } from 'react';
import ExerciseDetails from '../../../components/exerciseDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedExercise } from '../../../redux/trainer';
import { useRouter } from 'next/router';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import Loader from '../../../components/loader';

function Details() {
  const [loading, setLoading] = useState(false);
  const { selectedExercise } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const router = useRouter();

  if (loading) {
    return (
      <div>
        <div className="loader_wrapper">
          <Loader/>
        </div>
        <NavigationTrainer/>
      </div>
    )
  }

  return (
    <div>
      <div className="page_container">
          <div className="workout_addworkout" onClick={(e) => {
            setLoading(true);
            e.preventDefault();
            dispatch(setSelectedExercise({}));
            setLoading(false);
            router.push('/trainer/exercises');
        }}><span className="workout_addworkout_span">{"< "}</span>Back</div>
        <div className="workoutsExercises_flexCol">
        <ExerciseDetails exercise={selectedExercise}></ExerciseDetails>
        </div>
        </div>
        <NavigationTrainer/>
    </div>
  )
}

export default Details;
