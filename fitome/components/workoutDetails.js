import { useState, useEffect } from 'react';
import ExerciseDetails from './exerciseDetails';
import { useAuth } from '../firebase/contextAuth'
import ClientExerciseDetails from './clientExerciseDetails';

function WorkoutDetails({ workout }) {
  const [index, setIndex] = useState(0);
  const [exercise, setExercise] = useState({});
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const { currentUser } = useAuth();
  
  useEffect(() => {
    setExercise(workout.exercises[0]);
    console.log('workout exercise: ', exercise);
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
      <div className="page_title">{workout.title}</div>
      <div className="workoutsExercises_flex">
        <button className="carousel_button" onClick={handlePrevClick} disabled={prevDisabled}>◀</button>
        {currentUser.displayName == 'trainer' ? 
        <ExerciseDetails key={exercise.id} exercise={exercise}></ExerciseDetails>
        : <ClientExerciseDetails key={exercise?.id} exercise={exercise}></ClientExerciseDetails>}
        <button className="carousel_button" onClick={handleNextClick} disabled={nextDisabled}>▶</button>
      </div>
    </div>
  )
}

export default WorkoutDetails;
