import UploadImageForm from '../components/uploadImageForm.js';
import { postExercise } from '../redux/trainer';
import { useAuth } from '../firebase/contextAuth';
import { useDispatch } from 'react-redux';
import { router } from 'next/router';
import { useState } from 'react';

const Exercise = () => {
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
      router.push('/trainer');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form>
          <input placeHolder="Exercise name" type="text" onChange={(e) => setFormState({...formState, title: e.target.value})}/>
          <input placeHolder="Description" type="text" onChange={(e) => setFormState({...formState, description: e.target.value})}/>
          <input placeHolder="Muscle Group" type="text" onChange={(e) => setFormState({...formState, muscle_group: e.target.value})}/>
          <input placeHolder="Benefits" type="text" onChange={(e) => setFormState({...formState, benefits: e.target.value})}/>
          <input type="submit" value="Create" onClick={handleSubmit}/>
          <UploadImageForm setMedia={setMedia}></UploadImageForm>
      </form>
    </div>
  )
}

export default Exercise;
