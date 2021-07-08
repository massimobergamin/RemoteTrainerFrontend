import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getExercise } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';
import ShortExDetails from '../../../components/shortExDetails';
import Loader from '../../../components/loader';

function Exercises() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { exercises, armExs, legExs, backExs, chestExs, coreExs, shoulderExs, miscExs } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    dispatch(getExercise(currentUser.uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [])

  if (loading)
    return (
      <div>
        <div className="loader_wrapper">
          <Loader/>
        </div>
        <NavigationTrainer/>
      </div>
    );

  return (
    <div>
      <WorkoutsExercisesBar landingpage1="workouts_off" landingpage2="workouts_on"/>
      <div className="page_container_workout">
      <div className="workout_addworkout" onClick={(e) => {
          e.preventDefault();
          router.push('/trainer/exercises/create')
        }}><span className="workout_addworkout_span">+ </span>Exercise</div>
        {exercises[0] ?
        <div >
          {armExs.length ? <><div className="workout_title">Arms</div>
          <div className="workoutsExercises_largeCard2">
            {armExs && armExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div></>: null}
          {legExs.length ? <><div className="workout_title">Legs</div>
          <div className="workoutsExercises_largeCard2">
            {legExs && legExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div></>: null}
          {backExs.length ? <><div className="workout_title">Back</div>
          <div className="workoutsExercises_largeCard2">
            {backExs && backExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div></>: null}
          {chestExs.length ? <><div className="workout_title">Chest</div>
          <div className="workoutsExercises_largeCard2">
            {chestExs && chestExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
            </div></>: null}
          {coreExs?.length ? <><div className="workout_title">Core</div>
          <div className="workoutsExercises_largeCard2">
            {coreExs && coreExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
            </div></> : null}
          {shoulderExs?.length ? <><div className="workout_title">Shoulders</div>
          <div className="workoutsExercises_largeCard2">
          {shoulderExs && shoulderExs.map(exercise =>
            <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div></>: null}
          {miscExs.length ? <><div className="workout_title">Miscellaneous</div>
          <div className="workoutsExercises_largeCard2">
            {miscExs && miscExs.map(exercise =>
              <ShortExDetails key={exercise.id} exercise={exercise}></ShortExDetails>)}
          </div></>: null}
        </div> : <h3>Looks like you don't have any exercises.</h3>}
      </div>
      <NavigationTrainer/>
    </div>
  )
}

export default Exercises;
