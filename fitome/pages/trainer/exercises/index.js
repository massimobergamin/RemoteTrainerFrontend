import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getExercise } from '../../../redux/trainer';

function Exercises() {
  const router = useRouter();
  const { user, exercises } = useSelector(state => state.trainer);
  const [exList, setExList] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExercise(user.uid))
      .then(() => {
        setExList({...exList, arms: exercises.filter(exercise => exercise.muscle_group === 'arms' && exercise.type === 'custom')});
        setExList({...exList, legs: exercises.filter(exercise => exercise.muscle_group === 'legs' && exercise.type === 'custom')});
        setExList({...exList, back: exercises.filter(exercise => exercise.muscle_group === 'back' && exercise.type === 'custom')});
        setExList({...exList, chest: exercises.filter(exercise => exercise.muscle_group === 'chest' && exercise.type === 'custom')});
      })
  }, [])

  return (
    <div>
      <button onClick={() => router.push('/trainer/exercises/create')}>New Exercise</button>
      <h3>Arms</h3>
      {exList.arms && exList.arms.map(exercise =>
        <div>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoplay="true" loop="true">
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
        </div>)}
        <h3>Legs</h3>
      {exList.legs && exList.legs.map(exercise =>
        <div>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoplay="true" loop="true">
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
        </div>)}
        <h3>Back</h3>
      {exList.back && exList.back.map(exercise =>
        <div>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoplay="true" loop="true">
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
        </div>)}
        <h3>Chest</h3>
      {exList.chest && exList.chest.map(exercise =>
        <div>
          <div>{exercise.title}</div>
            {exercise.media &&
              <video id="Exercise_Video" width="176" height="176" autoplay="true" loop="true">
                  <source src={exercise.media} type="video/mp4"/>
                  Your browser does not support HTML5 video.
              </video>}
        </div>)}
    </div>
  )
}

export default Exercises;
