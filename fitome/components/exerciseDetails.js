import {  } from 'react';

function ExerciseDetails({ exercise }) {
  return (
    <div className="workoutsExercises_card">
      <p>{exercise.title}</p>
      <p>{exercise.description}</p>
      <p>{exercise.muscle_group}</p>
      <p>{exercise.benefits}</p>
      {exercise.media ?
        <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
            <source src={exercise.media} type="video/mp4"/>
            Your browser does not support HTML5 video.
        </video> :
      <img src="/noVid.png" width="176" height="176"></img>}
    </div>
  )
}

export default ExerciseDetails;
