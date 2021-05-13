import UploadVideoForm from '../../../components/uploadVideoForm';
import { postExercise } from '../../../redux/trainer';
import { useAuth } from '../../firebase/contextAuth';
import { useDispatch } from 'react-redux';
import { router } from 'next/router';
import { useState } from 'react';

const CreateExercise = () => {
  const [media, setMedia] = useState('');
  const initialState = {
    title: '',
    description: '',
    muscle_group: '',
    benefits: '',
    media: media
  };
  const [formState, setFormState] = useState(initialState);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    try {
      dispatch(postExercise(currentUser.uid, {...formState, type: 'custom'}));
      router.push('/exercises');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Create New Exercise</h1>
      <form>
          <input placeHolder="Title" type="text" onChange={(e) => setFormState({...formState, title: e.target.value})}/>
          <input placeHolder="Description" type="text" onChange={(e) => setFormState({...formState, description: e.target.value})}/>
          <input placeHolder="Muscle Group" type="text" onChange={(e) => setFormState({...formState, muscle_group: e.target.value})}/>
          <input placeHolder="Benefits" type="text" onChange={(e) => setFormState({...formState, benefits: e.target.value})}/>
          <input type="submit" value="Create" onClick={handleSubmit}/>
          <UploadVideoForm setMedia={setMedia}></UploadVideoForm>
      </form>
    </div>
  )
}

export default CreateExercise;