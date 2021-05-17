import UploadVideoForm from '../../../components/uploadVideoForm';
import { postExercise } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import WorkoutsExercisesBar from '../../../components/workoutsExercisesBar';

const CreateExercise = () => {
  const router = useRouter();
  const [media, setMedia] = useState('');
  const initialState = {
    title: '',
    description: '',
    muscle_group: '',
    benefits: '',
    media: ''
  };
  const [formState, setFormState] = useState(initialState);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { exercises } = useSelector(state => state.trainer);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch(postExercise({trainer_uid: currentUser.uid, exerciseData: {...formState, media: media, type: 'custom'}}))
        .then(() => router.push('/trainer/exercises'));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <WorkoutsExercisesBar></WorkoutsExercisesBar>
      <div className="pageContainer">
        <h1>Create New Exercise</h1>
        <form className="workoutsExercises_form">
          <label className="workoutsExercises_field" htmlFor="title">Title:
            <input placeholder="Title" type="text" onChange={(e) => setFormState({...formState, title: e.target.value})}/>
          </label>
          <label className="workoutsExercises_field" htmlFor="sescription">Description:
            <input placeholder="Description" type="text" onChange={(e) => setFormState({...formState, description: e.target.value})}/>
          </label>
          <label className="workoutsExercises_field" htmlFor="muscleGroup">Muscle Group:
            <input placeholder="Muscle Group" type="text" list="muscleGroups" onChange={(e) => setFormState({...formState, muscle_group: e.target.value.toLowerCase()})}/>
            <datalist id="muscleGroups">
              <option>Arms</option>
              <option>Legs</option>
              <option>Back</option>
              <option>Chest</option>
            </datalist>
          </label>
          <label className="workoutsExercises_field" htmlFor="benefits">Benefits:
            <input placeholder="Benefits" type="text" onChange={(e) => setFormState({...formState, benefits: e.target.value})}/>
          </label>
          <label className="workoutsExercises_field" htmlFor="video">Video:
            <UploadVideoForm setMedia={setMedia}></UploadVideoForm>
          </label>
        </form>
          <button className="button" onClick={handleSubmit} disabled={formState.title===""||formState.description===""||formState.muscle_group===""||media==='uploading'}>Create</button>
      </div>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default CreateExercise;