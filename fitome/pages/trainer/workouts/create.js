import { getExercise, postWorkout } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'next/router';
import { useEffect } from 'react';

const CreateWorkout = () => {
  const initialState = {
    title: '',
    exerciseIds: []
  };
  const [formState, setFormState] = useState(initialState);
  const [buttonText, setButtonText] = useState('Add');
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { exercises } = useSelector(state => state.trainer);

  useEffect(() => {
    dispatch(getExercise(currentUser.uid));
  }, [])

  const handleClick = (e, id) => {
    if (buttonText === 'Add') {
      setFormState({...formState, exercisesIds: [...formState.exerciseIds, id]});
      setButtonText('Remove');
    }
    else {
      let tempExerciseIds = formState.exerciseIds;
      tempExerciseIds = tempExerciseIds.filter(exerciseId => exerciseId !== id);
      setFormState({...formState, exercisesIds: [...tempExerciseIds]});
      setButtonText('Add');
    }
  }

  const handleSubmit = () => {
    try {
      dispatch(postWorkout(currentUser.uid, formState));
      router.push('/workouts');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Create New Workout</h1>
      <form>
          <input placeHolder="Title" type="text" onChange={(e) => setFormState({...formState, title: e.target.value})}/>
          <h3>Select Exercises</h3>
          {exercises.map(exercise => {
            <div key={exercise.id}>
              <div>{exercise.title}</div>
              {exercise.media &&
                <video id="Exercise_Video" width="176" height="176" autoplay="true" loop="true">
                    <source src={exercise.media} type="video/mp4"/>
                    Your browser does not support HTML5 video.
                </video>}
              <div>{exercise.muscle_group}</div>
              <button onClick={() => handleClick(e, exercise.id)}>{buttonText}</button>
            </div>
          })}
          <input type="submit" value="Create" onClick={handleSubmit}/>
      </form>
    </div>
  )
}

export default CreateWorkout;