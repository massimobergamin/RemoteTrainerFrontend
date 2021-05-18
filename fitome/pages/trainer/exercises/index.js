import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getExercise } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';
import ShortExDetails from '../../../components/shortExDetails';

function Exercises() {
  const router = useRouter();
  const { user, exercises, armExs, legExs, backExs, chestExs, coreExs, shoulderExs, miscExs } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch(getExercise(currentUser.uid));
  }, [])

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
          {coreExs.length ? <h3>Core</h3> : null}
          <div className="workoutsExercises_scroll">
            {coreExs && coreExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
            </div>
          {shoulderExs.length ? <h3>Shoulders</h3> : null}
          <div className="workoutsExercises_scroll">
          {shoulderExs && shoulderExs.map(exercise =>
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
