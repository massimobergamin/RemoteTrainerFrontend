import {  } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSelectedExercise } from '../redux/trainer';

function shortExDetails({ exercise }) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="workoutsExercises_cards">
      
        {exercise.media ?
          <video id="Exercise_Video" width="176" height="176" controls muted loop={true}>
              <source src={exercise.media} type="video/mp4"/>
              Your browser does not support HTML5 video.
          </video> :
        <img src="/noVid.png" width="176" height="176"></img>}
        <p className="exerciselist_title">{exercise.title}</p>
        <button className="button_workout" onClick={() => {
        dispatch(setSelectedExercise(exercise));
        router.push('/trainer/exercises/details');
      }}>View Details</button>
    </div>
  )
}

export default shortExDetails;
