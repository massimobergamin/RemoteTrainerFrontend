import { useState } from 'react';
import { useAuth } from '../firebase/contextAuth'
import { useSelector, useDispatch } from 'react-redux';
import UploadImageForm from './uploadImageForm';
import { updateUser } from '../redux/trainer';
import { useRouter } from 'next/router';

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const router = useRouter();
  const [photo, setPhoto] = useState('');

  const initialState = {
  };
  const [profileState, setProfileState] = useState(initialState);
  const { user } = useSelector(state => state.trainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({uid: currentUser.uid, userData: {...profileState, profile_picture: photo ? photo : user.profile_picture}}))
      .then(() => router.push('/trainer/profile'));
  };

  return (
    <div>
      <div className="pageContainer">
        <form className="profileCreate_form">
          <label htmlFor="weight">Weight (lb):
          <br/>
            <input
            type="number"
            name="weight"
            value={profileState.weight}
            step="1"
            min="0"
            onChange={(e) => setProfileState({...profileState, weight: parseInt(e.target.value)})}/>
          </label>
          <label htmlFor="height">Height (cm):
          <br/>
            <input
            type="number"
            name="height"
            value={profileState.height}
            step="1"
            min="0"
            onChange={(e) => setProfileState({...profileState, height: parseInt(e.target.value)})}/>
          </label>
          <label htmlFor="Birthday">Birthday:
          <br/>
            <input
            type="date"
            name="birthday"
            value={profileState.birthday}
            max="2003-05-17"
            onChange={(e) => setProfileState({...profileState, birthday: e.target.value})}/>
          </label>
          <label htmlFor="sex">Sex:
          <br/>
            <input
            name="sex"
            value={profileState.sex}
            list="sexes"
            onChange={(e) => setProfileState({...profileState, sex: e.target.value})}/>
            <datalist id="sexes">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>I prefer not to say</option>
            </datalist>
          </label>
          <label htmlFor="profilePicture">Profile Picture:
          <br/>
            <UploadImageForm setPhoto={setPhoto}></UploadImageForm>
          </label>
            <input className="button" type="submit" value="Save" onClick={e => handleSubmit(e)} disabled={photo==='uploading'}/>
            <input className="button" type="submit" value="Cancel" onClick={e => {
              e.preventDefault();
              router.push('/trainer/profile');
              }}/>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfileForm;