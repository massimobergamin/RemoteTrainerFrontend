import {  } from 'react';

function ExerciseDetails({ exercise }) {
  return (
    <div className="workoutsExercises_card">
      <p>{exercise.title}</p>
      {exercise.media ?
        <video id="Exercise_Video" width="176" height="176" controls muted loop={true}>
            <source src={exercise.media} type="video/mp4"/>
            Your browser does not support HTML5 video.
        </video> :
      <img src="/noVid.png" width="176" height="176"></img>}
      <div>Description: {exercise.description}</div>
      <div>Muscle Group: {exercise.muscle_group}</div>
      {exercise.benefits && <div>Benefits: {exercise.benefits}</div>}
    </div>
  )
}

export default ExerciseDetails;
