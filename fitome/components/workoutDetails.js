import {  } from 'react';
import ExerciseDetails from './exerciseDetails';

function WorkoutDetails({ workout }) {
  return (
    <div>
      <h3>{workout.title}</h3>
      {workout.exercises && workout.exercises.map(exercise =>
        <ExerciseDetails key={exercise.id} exercise={exercise}></ExerciseDetails>
      )}
    </div>
  )
}

export default WorkoutDetails;
