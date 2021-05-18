import { useState } from 'react';
import { useAuth } from '../firebase/contextAuth'
import { useSelector, useDispatch } from 'react-redux';
import UploadImageForm from './uploadImageForm';
import { updateUser } from '../redux/trainer';
import { useRouter } from 'next/router';

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [photo, setPhoto] = useState('');

  const initialState = {
  };
  const [profileState, setProfileState] = useState(initialState);
  const { user, invite_code } = useSelector(state => state.trainer);

  console.log('user in updateProfForm', currentUser)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('currentUser in updateProf', currentUser)
    dispatch(updateUser({uid: currentUser.uid, userData: {...profileState, profile_picture: photo}}))
      // .then(() => router.push('/trainer/profile'));
  };

  return (
    <div>
      <div className="pageContainer">
        <form className="profileCreate_form">
          <label className="profileCreate_field" htmlFor="weight">Weight (lb):
          <br/>
            <input
            className="profileCreate_field"
            type="number"
            name="weight"
            value={profileState.weight}
            step="1"
            min="0"
            onChange={(e) => setProfileState({...profileState, weight: parseInt(e.target.value)})}/>
          </label>
          <label className="profileCreate_field" htmlFor="height">Height (cm):
          <br/>
            <input
            className="profileCreate_field"
            placeholder="Height"
            type="number"
            name="height"
            placeholder="Height"
            value={profileState.height}
            step="1"
            min="0"
            onChange={(e) => setProfileState({...profileState, height: parseInt(e.target.value)})}/>
          </label>
          <label className="profileCreate_field" htmlFor="Birthday">Birthday:
          <br/>
            <input
            className="profileCreate_field"
            placeholder="Birthday"
            type="date"
            name="birthday"
            value={profileState.birthday}
            max="2003-05-17"
            onChange={(e) => setProfileState({...profileState, birthday: e.target.value})}/>
          </label>
          {/*label className="profileCreate_field" htmlFor="sex">Sex:
          <br/>
            <input
            className="profileCreate_field"
            placeholder="Sex"
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
          </label> */}
          <label className="profileCreate_field" htmlFor="profilePicture">Profile Picture:
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

export default UpdateProfileForm