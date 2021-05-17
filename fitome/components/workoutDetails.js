import { useState, useEffect } from 'react';
import ExerciseDetails from './exerciseDetails';

function WorkoutDetails({ workout }) {
  const [index, setIndex] = useState(0);
  const [exercise, setExercise] = useState({});
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    setExercise(workout.exercises[0]);
    if (workout.exercises.length === 1) {
      setPrevDisabled(true);
      setNextDisabled(true)
    }
  }, [])

  function handlePrevClick (e) {
    if (workout.exercises[index-1] !== undefined) {
      if (workout.exercises[index-2] === undefined) setPrevDisabled(true);
      setExercise(workout.exercises[index-1]);
      setIndex(index-1);
      setNextDisabled(false);
    }
  }

  function handleNextClick (e) {
    if (workout.exercises[index+1] !== undefined) {
      if (workout.exercises[index+2] === undefined) setNextDisabled(true);
      setExercise(workout.exercises[index+1]);
      setIndex(index+1);
      setPrevDisabled(false);
    }
  }

  return (
    <div>
      <h3>{workout.title}</h3>
      <div className="workoutsExercises_flex">
        <button className="button" onClick={handlePrevClick} disabled={prevDisabled}>◀</button>
        <ExerciseDetails key={exercise.id} exercise={exercise}></ExerciseDetails>
        <button className="button" onClick={handleNextClick} disabled={nextDisabled}>▶</button>
      </div>
    </div>
  )
}

export default WorkoutDetails;
