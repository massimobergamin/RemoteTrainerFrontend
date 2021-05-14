import UploadVideoForm from '../../../components/uploadVideoForm';
import { postExercise } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
      dispatch(postExercise({trainer_uid: currentUser.uid, exerciseData: {...formState, media: media, type: 'custom'}}));
      router.push('/trainer/exercises');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Create New Exercise</h1>
      <form>
          <input placeholder="Title" type="text" onChange={(e) => setFormState({...formState, title: e.target.value})}/>
          <input placeholder="Description" type="text" onChange={(e) => setFormState({...formState, description: e.target.value})}/>
          <input placeholder="Muscle Group" type="text" onChange={(e) => setFormState({...formState, muscle_group: e.target.value})}/>
          <input placeholder="Benefits" type="text" onChange={(e) => setFormState({...formState, benefits: e.target.value})}/>
          <input type="submit" value="Create" onClick={handleSubmit}/>
          <UploadVideoForm setMedia={setMedia}></UploadVideoForm>
      </form>
    </div>
  )
}

export default CreateExercise;