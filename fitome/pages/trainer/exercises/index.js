import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getExercise } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';
import ShortExDetails from '../../../components/shortExDetails';

function Exercises() {
  const router = useRouter();
  const { user, exercises } = useSelector(state => state.trainer);
  const [armExs, setArmExs] = useState([]);
  const [legExs, setLegExs] = useState([]);
  const [backExs, setBackExs] = useState([]);
  const [chestExs, setChestExs] = useState([]);
  const [miscExs, setMiscExs] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch(getExercise(currentUser.uid));
    categorizeExercises();
  }, [])

  const categorizeExercises = () => {
    setArmExs(exercises.filter(exercise => exercise.muscle_group === 'arms' && exercise.type === 'custom'));
    setLegExs(exercises.filter(exercise => exercise.muscle_group === 'legs' && exercise.type === 'custom'));
    setBackExs(exercises.filter(exercise => exercise.muscle_group === 'back' && exercise.type === 'custom'));
    setChestExs(exercises.filter(exercise => exercise.muscle_group === 'chest' && exercise.type === 'custom'));
    setMiscExs(exercises.filter(exercise => exercise.muscle_group !== 'arms' && exercise.muscle_group !== 'legs'
      && exercise.muscle_group !== 'back' && exercise.muscle_group !== 'chest' && exercise.type === 'custom'));
  }

  return (
    <div>
      <WorkoutsExercisesBar></WorkoutsExercisesBar>
      <div className="pageContainer">
        <button className="button" onClick={() => router.push('/trainer/exercises/create')}>New Exercise</button>
        {exercises[0] ?
        <div>
          {armExs.length ? <h3>Arms</h3> : null}
          <div className="workoutsExercises_scroll">
            {armExs && armExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div>
          {legExs.length ? <h3>Legs</h3> : null}
          <div className="workoutsExercises_scroll">
            {legExs && legExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div>
          {backExs.length ? <h3>Back</h3> : null}
          <div className="workoutsExercises_scroll">
            {backExs && backExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div>
          {chestExs.length ? <h3>Chest</h3> : null}
          <div className="workoutsExercises_scroll">
            {chestExs && chestExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
            </div>
          {miscExs.length ? <h3>Miscellaneous</h3> : null}
          <div className="workoutsExercises_scroll">
            {miscExs && miscExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div>
        </div> : <h2>Looks like you don't have any exercises.</h2>}
      </div>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Exercises;
