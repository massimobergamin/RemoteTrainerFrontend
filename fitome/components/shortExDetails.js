import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSelectedExercise } from '../redux/trainer';
import Loader from '../components/loader';

function shortExDetails({ exercise }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  if (loading) return <Loader/>;

  return (
    <div className="workoutsExercises_cards">

        {exercise.media ?
          <video id="Exercise_Video" controls muted loop={true}>
              <source src={exercise.media} type="video/mp4"/>
              Your browser does not support HTML5 video.
          </video> :
        <img id="Exercise_Video" src="/noVid.png"></img>}
        <p className="exerciselist_title">{exercise.title}</p>
        <button className="button_workout" onClick={() => {
        setLoading(true);
        dispatch(setSelectedExercise(exercise))
         setLoading(false);
        router.push('/trainer/exercises/details');
      }}>View Details</button>
    </div>
  )
}

export default shortExDetails;
