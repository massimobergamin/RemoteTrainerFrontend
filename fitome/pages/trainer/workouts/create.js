import { getExercise, postWorkout } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CreateWorkout = () => {
  const router = useRouter();
  const initialState = {
    title: '',
    exerciseIds: []
  };
  const [formState, setFormState] = useState(initialState);
  const [buttonTextArr, setButtonTextArr] = useState([]);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { exercises } = useSelector(state => state.trainer);

  useEffect(() => {
    console.log('currentUser', currentUser);
    console.log('exercises', exercises)
    dispatch(getExercise(currentUser.uid));
  }, [])

  const handleClick = (id, i) => {
    if (buttonTextArr[i] === 'Add' || !buttonTextArr[i]) {
      setFormState({...formState, exerciseIds: [...formState.exerciseIds, id]});
      let tempArr = buttonTextArr;
      tempArr[i] = 'Remove';
      setButtonTextArr(tempArr);

    }
    else {
      let tempExerciseIds = formState.exerciseIds;
      tempExerciseIds = tempExerciseIds.filter(exerciseId => exerciseId !== id);
      setFormState({...formState, exerciseIds: [...tempExerciseIds]});
      let tempArr = buttonTextArr;
      tempArr[i] = 'Add';
      setButtonTextArr(tempArr);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(postWorkout({trainer_uid: currentUser.uid, workoutData: formState}));
      router.push('/trainer/workouts');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Create New Workout</h1>
      <form>
          <input placeholder="Title" type="text" onChange={(e) => setFormState({...formState, title: e.target.value})}/>
          <button onClick={handleSubmit}>Create</button>
      </form>
        <h3>Select Exercises</h3>
        {exercises && exercises.map((exercise, i) =>
          <div key={exercise.id}>
            <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoplay="true" loop="true">
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
            <div>{exercise.muscle_group}</div>
            <button onClick={() => handleClick(exercise.id, i)}>{buttonTextArr[i] || 'Add'}</button>
          </div>)}
    </div>
  )
}

export default CreateWorkout;