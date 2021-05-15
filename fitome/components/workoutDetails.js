import {  } from 'react';

function WorkoutDetails({ workout }) {
  return (
    <div>
      <h3>{workout.title}</h3>
      {workout.exercises && workout.exercises.map(exercise =>
        <div key={exercise.id}>
        <div>{exercise.title}</div>
          {exercise.media &&
            <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
              <source src={exercise.media} type="video/mp4"/>
              Your browser does not support HTML5 video.
            </video>}
      </div>)}
    </div>
  )
}

export default WorkoutDetails;
