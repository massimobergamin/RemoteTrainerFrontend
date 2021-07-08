import UploadVideoForm from '../../../components/uploadVideoForm';
import { postExercise } from '../../../redux/trainer';
import { useAuth } from '../../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NavigationTrainer from '../../../components/navigationBar/navigationTrainer';
import Loader from '../../../components/loader';

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
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { exercises } = useSelector(state => state.trainer);

  const handleSubmit = (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      dispatch(postExercise({trainer_uid: currentUser.uid, exerciseData: {...formState, media: media, type: 'custom'}}))
        .then(() => {
          setLoading(false);
          router.push('/trainer/exercises');
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  if (loading) {
    return (
      <div>
        <div className="loader_wrapper">
          <Loader/>
        </div>
        <NavigationTrainer/>
      </div>
    )
  }

  return (
    <div>
      <div className="page_container">
        <div className="createprofile_wrapper">
          <div className="page_title">Create New Exercise</div>
          <div className="exerciseFormAndButton">
          <form className="createprofile_form">
            <label htmlFor="title">Title: <br/>
              <input type="text" onChange={(e) => setFormState({...formState, title: e.target.value})}/>
            </label>
            <label htmlFor="description">Description: <br/>
              <textarea name="description" rows="4" cols="50" style={{width: "70vw", height: "15vh"}} onChange={(e) => setFormState({...formState, description: e.target.value})}></textarea>
            {console.log('formState', formState)}
            </label>
            <label htmlFor="muscleGroup">Muscle Group: <br/>
              <input type="text" list="muscleGroups" onChange={(e) => setFormState({...formState, muscle_group: e.target.value.toLowerCase()})}/>
              <datalist id="muscleGroups">
                <option>Arms</option>
                <option>Legs</option>
                <option>Back</option>
                <option>Chest</option>
                <option>Core</option>
                <option>Shoulders</option>
              </datalist>
            </label>
            <label htmlFor="benefits">Benefits: <br/>
              <input type="text" onChange={(e) => setFormState({...formState, benefits: e.target.value})}/>
            </label>
            <label htmlFor="video">Video: <br/>
              <UploadVideoForm setMedia={setMedia}></UploadVideoForm>
            </label>
            <button className="button" onClick={handleSubmit} disabled={formState.title===""||formState.description===""||formState.muscle_group===""||media==='uploading'}>Create</button>
            </form>
            <button className="buttonCancel" onClick={() => {
              router.push('/trainer/exercises');
            }}>Cancel</button>
          </div>
        </div>
      </div>
      <NavigationTrainer/>
    </div>
  )
}

export default CreateExercise;