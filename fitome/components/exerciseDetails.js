import {  } from 'react';

function ExerciseDetails({ exercise }) {
  return (
    <div className="workoutsExercises_card">
      <div  className="workout_title">{exercise.title}</div>
      {exercise.media ?
        <video className="exercise_video" controls muted loop={true}>
            <source src={exercise.media} type="video/mp4"/>
            Your browser does not support HTML5 video.
        </video> :
      <img src="/noVid.png" className="exercise_video"></img>}
      <div className="exercise_info">
      <div><span className="exercise_subtitle">Description: </span>{exercise.description}</div>
      <div><span className="exercise_subtitle">Muscle Group: </span>{exercise.muscle_group}</div>
      {exercise.benefits && <div><span className="exercise_subtitle">Benefits: </span>{exercise.benefits}</div>}
      </div>
    </div>
  )
}

export default ExerciseDetails;
