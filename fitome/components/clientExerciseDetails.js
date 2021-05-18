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
        {exercise?.media ?
         <video id="Exercise_Video" width="176" height="176" controls muted>
             <source src={exercise.media} type="video/mp4"/>
             Your browser does not support HTML5 video.
         </video> :
       <img src="/noVid.png" width="176" height="176"></img>}
      </div>
     }
    </div>
  )
}

export default ClientExerciseDetails
