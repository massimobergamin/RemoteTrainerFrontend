import { useState } from 'react';
import { useAuth } from '../firebase/contextAuth'
import { useSelector } from 'react-redux';
import UploadImageForm from './uploadImageForm';
import { updateUser } from '../redux/trainer';
import { useDispatch } from 'react-redux';

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  
  const [photo, setPhoto] = useState('');

  const initialState = {
    profile_picture: photo,
    sex: "",
    weight: 0,
    height: 0,
    birthday: 0,
    trainer_uid: currentUser.uid
  };
  const [profileState, setProfileState] = useState(initialState);
  const { user } = useSelector(state => state.trainer);
  console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(currentUser.uid, profileState));
  };

  return (
    <div>
      <form>
          <input
          type="text" 
          name="weight"
          value={profileState.weight}
          onChange={(e) => setProfileState({...profileState, weight:e.target.value})}/>
          <input placeholder="Height" 
          type="text" 
          name="height" 
          placeholder="Height"
          value={profileState.height}
          onChange={(e) => setProfileState({...profileState, height:e.target.value})}/>
          <input placeholder="Birthday" 
          type="text" 
          name="birthday" 
          value={profileState.birthday}
          onChange={(e) => setProfileState({...profileState, birthday:e.target.value})}/>
           <input placeholder="Gender"
          type="text" 
          name="gender"
          value={profileState.sex}
          onChange={(e) => setProfileState({...profileState, sex:e.target.value})}/>
          <input type="submit" value="update" onClick={e => handleSubmit(e)}/>
          <UploadImageForm>setPhoto={setPhoto}</UploadImageForm>
      </form>
    </div>
  )
}

export default UpdateProfileForm