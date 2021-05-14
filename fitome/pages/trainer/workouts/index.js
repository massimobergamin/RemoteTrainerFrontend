import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWorkout } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';

function Workouts() {
  const router = useRouter();
  const { workouts } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch(getWorkout(currentUser.uid));
  }, [])

  return (
    <div>
      <button onClick={() => router.push('/trainer/workouts/create')}>New Workout</button>
      {workouts && workouts.map(workout =>
        <div key={workout.id}>
          <div>{workout.title}</div>
          {workout.exercises && workout.exercises.map(exercise =>
            <div key={exercise.id}>
            <div>{exercise.title}</div>
              {exercise.media &&
                <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
                    <source src={exercise.media} type="video/mp4"/>
                    Your browser does not support HTML5 video.
                </video>}
          </div>)}
        </div>)}
    </div>
  )
}

export default Workouts;
