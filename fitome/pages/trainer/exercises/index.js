import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getExercise, setSelectedExercise } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';

function Exercises() {
  const router = useRouter();
  const { user, exercises } = useSelector(state => state.trainer);
  const [armExs, setArmExs] = useState([]);
  const [legExs, setLegExs] = useState([]);
  const [backExs, setBackExs] = useState([]);
  const [chestExs, setChestExs] = useState([]);
  const [miscExs, setMiscExs] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch(getExercise(currentUser.uid));
    categorizeExercises();
  }, [])

  const categorizeExercises = () => {
    setArmExs(exercises.filter(exercise => exercise.muscle_group === 'arms' && exercise.type === 'custom'));
    setLegExs(exercises.filter(exercise => exercise.muscle_group === 'legs' && exercise.type === 'custom'));
    setBackExs(exercises.filter(exercise => exercise.muscle_group === 'back' && exercise.type === 'custom'));
    setChestExs(exercises.filter(exercise => exercise.muscle_group === 'chest' && exercise.type === 'custom'));
    setMiscExs(exercises.filter(exercise => exercise.muscle_group !== 'arms' && exercise.muscle_group !== 'legs'
      && exercise.muscle_group !== 'back' && exercise.muscle_group !== 'chest' && exercise.type === 'custom'));
  }

  return (
    <div>
      <button onClick={() => router.push('/trainer/exercises/create')}>New Exercise</button>
      <h3>Arms</h3>
      {armExs && armExs.map(exercise =>
        <div key={exercise.id}>
          <button onClick={() => {
            dispatch(setSelectedExercise(exercise));
            router.push('/trainer/exercises/details');
          }}>View Details</button>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
        </div>)}
        <h3>Legs</h3>
      {legExs && legExs.map(exercise =>
        <div key={exercise.id}>
          <button onClick={() => {
            dispatch(setSelectedExercise(exercise));
            router.push('/trainer/exercises/details');
          }}>View Details</button>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
        </div>)}
        <h3>Back</h3>
      {backExs && backExs.map(exercise =>
        <div key={exercise.id}>
          <button onClick={() => {
            dispatch(setSelectedExercise(exercise));
            router.push('/trainer/exercises/details');
          }}>View Details</button>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
        </div>)}
        <h3>Chest</h3>
      {chestExs && chestExs.map(exercise =>
        <div key={exercise.id}>
          <button onClick={() => {
            dispatch(setSelectedExercise(exercise));
            router.push('/trainer/exercises/details');
          }}>View Details</button>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
          </div>)}
          <h3>Miscellaneous</h3>
      {miscExs && miscExs.map(exercise =>
        <div key={exercise.id}>
          <button onClick={() => {
            dispatch(setSelectedExercise(exercise));
            router.push('/trainer/exercises/details');
          }}>View Details</button>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
        </div>)}
    </div>
  )
}

export default Exercises;
