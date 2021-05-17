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
    profile_picture: "",
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
    console.log(profileState)
    dispatch(updateUser({uid: currentUser.uid, userData: {...profileState, profile_picture: photo}}));
  };

  return (
    <div>
      <div className="profileContainer">
        <form className="profileCreate_form">
            <p className="profileLabelInput">weight</p>
            <input
            className="profileCreate_field"
            type="text" 
            name="weight"
            value={profileState.weight}
            onChange={(e) => setProfileState({...profileState, weight:e.target.value})}/>
            <p className="profileLabelInput">height</p>
            <input 
            className="profileCreate_field"
            placeholder="Height" 
            type="text" 
            name="height" 
            placeholder="Height"
            value={profileState.height}
            onChange={(e) => setProfileState({...profileState, height:e.target.value})}/>
            <p className="profileLabelInput">birthday</p>
            <input 
            className="profileCreate_field"
            placeholder="Birthday" 
            type="date" 
            name="birthday" 
            value={profileState.birthday}
            onChange={(e) => setProfileState({...profileState, birthday:e.target.value})}/>
            <input 
            className="profileCreate_field"
            placeholder="Gender"
            type="text" 
            name="gender"
            value={profileState.sex}
            onChange={(e) => setProfileState({...profileState, sex:e.target.value})}/>
            <UploadImageForm setPhoto={setPhoto}></UploadImageForm>
            <input className="button" type="submit" value="update" onClick={e => handleSubmit(e)}/>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfileForm