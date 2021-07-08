import React, { useState } from 'react'
import ExerciseDetails from './exerciseDetails';

const ClientExerciseDetails = ({ exercise }) => {
  const [selectedEx, setSelectedEx] = useState({});
  const [selected, setSelected] = useState(false);

  const handleClick = (e) => {
    setSelected(prev => !prev);
  };

  return (
    <div className={selected ? "workoutsExercises_FadeIn" : "workoutsExercises_clientCard"} onClick={handleClick}>
      {selected ?
      <div className="workoutsExercises_expandedContainer">
        <div className="workoutsExercises_FadeIn">
          <ExerciseDetails key={exercise.id} exercise={exercise} className="workoutsExercises_focusedCard"></ExerciseDetails>
        </div>
      </div>
      :
      <div>
        <p>{exercise?.title}</p>
        <div><b>Reps:</b> {exercise.reps}</div>
        <div><b>Sets:</b> {exercise.sets}</div>
        <div><b>Notes:</b> {exercise.notes}</div>
        {exercise?.media ?
         <video className="exercise_video" controls muted>
             <source src={exercise.media} type="video/mp4"/>
             Your browser does not support HTML5 video.
         </video> :
       <img className="exercise_video" src="/noVid.png"></img>}
      </div>
     }
    </div>
  )
}

export default ClientExerciseDetails
