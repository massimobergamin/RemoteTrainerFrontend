import {  } from 'react';

function ExerciseDetails({ exercise }) {
  return (
    <div className="workoutsExercises_card">
      <div  className="workout_title">{exercise.title}</div>
      {exercise.media ?
        <video className="exercise_video" id="Exercise_Video" width="176" height="176" controls muted loop={true}>
            <source src={exercise.media} type="video/mp4"/>
            Your browser does not support HTML5 video.
        </video> :
      <img src="/noVid.png" className="exercise_video" width="176" height="176"></img>}
      <div><span className="exercise_subtitle">Description: </span>{exercise.description}</div>
      <div><span className="exercise_subtitle">Muscle Group: </span>{exercise.muscle_group}</div>
      {exercise.benefits && <div><span className="exercise_subtitle">Benefits: </span>{exercise.benefits}</div>}
    </div>
  )
}

export default ExerciseDetails;
