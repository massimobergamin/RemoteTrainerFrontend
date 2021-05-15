import {  } from 'react';

function ExerciseDetails({ exercise }) {
  return (
    <div>
      <p>{exercise.title}</p>
      <p>{exercise.description}</p>
      <p>{exercise.muscle_group}</p>
      <p>{exercise.benefits}</p>
      {exercise.media &&
        <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
            <source src={media} type="video/mp4"/>
            Your browser does not support HTML5 video.
        </video>}
    </div>
  )
}

export default ExerciseDetails;
