import { useState, useEffect } from 'react';
import ExerciseDetails from './exerciseDetails';
import { useAuth } from '../firebase/contextAuth';
import ClientExerciseDetails from './clientExerciseDetails';

function WorkoutDetails({ workout }) {
  const [index, setIndex] = useState(0);
  const [exercise, setExercise] = useState({});
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    addRepsAndSets(0);
    if (workout.exercises.length === 1) {
      setPrevDisabled(true);
      setNextDisabled(true);
    }
  }, [])

  function addRepsAndSets(index) {
    if (workout.reps && workout.sets)
      setExercise({
        ...workout.exercises[index],
        reps: workout.reps[index],
        sets: workout.sets[index],
        notes: workout.trainer_notes
      });
    else setExercise(workout.exercises[index]);
  }

  function handlePrevClick (e) {
    if (workout.exercises[index-1] !== undefined) {
      if (workout.exercises[index-2] === undefined) setPrevDisabled(true);
      addRepsAndSets(index - 1);
      setIndex(index-1);
      setNextDisabled(false);
    }
  }

  function handleNextClick (e) {
    if (workout.exercises[index+1] !== undefined) {
      if (workout.exercises[index+2] === undefined) setNextDisabled(true);
      addRepsAndSets(index+1);
      setIndex(index+1);
      setPrevDisabled(false);
    }
  }

  return (
    <div className="plan_detail_breakdown">
      <div className="page_title">{workout.title}</div>
      <div className="workoutsExercises_flex">
        <button className="carousel_button" onClick={handlePrevClick} disabled={prevDisabled}><img src="/previous.png" width="20" height="20"></img></button>
        {currentUser.displayName == 'trainer' ?
        <ExerciseDetails key={exercise.id} exercise={exercise}></ExerciseDetails>
        : <ClientExerciseDetails key={exercise?.id} exercise={exercise}></ClientExerciseDetails>}
        <button className="carousel_button" onClick={handleNextClick} disabled={nextDisabled}><img src="/next.png" width="20" height="20"></img></button>
      </div>
    </div>
  )
}

export default WorkoutDetails;
