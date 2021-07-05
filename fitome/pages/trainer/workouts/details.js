import {  } from 'react';
import WorkoutDetails from '../../../components/workoutDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWorkout } from '../../../redux/trainer';
import { useRouter } from 'next/router';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';
import Loader from '../../../components/loader';

function Details() {
  const [loading, setLoading] = useState(false);
  const { selectedWorkout } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const router = useRouter();

  if (loading) return <Loader/>;

  return (
    <div>
      
      <div className="page_container">
      <div className="workout_addworkout" onClick={(e) => {
          setLoading(true);
          e.preventDefault();
          dispatch(setSelectedWorkout({})).then(setLoading(false));
          router.push('/trainer/workouts')
        }}><span className="workout_addworkout_span">{"< "}</span>Back</div>
        <WorkoutDetails workout={selectedWorkout}></WorkoutDetails>
      </div>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Details;
