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
  const [url, setURL] = useState('');

  const initialState = {
  };
  const [profileState, setProfileState] = useState(initialState);
  const [file, setFile] = useState("")
  const { user } = useSelector(state => state.trainer);

  const types = ['image/png', 'image/jpeg'];

  const handleEditProfile = (e) => {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        setFile(selected);
      } else {
          setFile("");
          alert('Please select an image file (png or jpg)');
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({uid: currentUser.uid, userData: {...profileState, profile_picture: url ? url : user.profile_picture}}))
      .then(() => router.push('/trainer/profile'));
  };

  return (
    <div >
      <div className="page_title">Edit Profile</div>
      {!url ?
         <label className="profilewrapper">
            {user.profile_picture?
                        <img className="profilePic" src={user.profile_picture}/>
                        :
                        <img className="profilePic" src="/emptyprofile.png"/>
                        }
                        <input className="profilePic_input" type="file" onChange={handleEditProfile}/>
                        <span className="profile_addImage">Click Image to Edit Profile Image</span>
                    </label>
                    :
                    <div className="profilewrapper">
                        {url && <img className="profilePic" src={url}></img>}
                        <span className="profile_addImage">New Profile Image</span>
                    </div>
                }
                {!url && file && <UploadImageForm file={file} setURL={setURL} />}
        <form className="createprofile_form">
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
            <button className="button" type="submit"  onClick={e => handleSubmit(e)} disabled={url==='uploading'}>Save</button>
            <button className="buttonCancel" type="button"  onClick={e => {
              router.push('/trainer/profile');
              }}>Cancel</button>
        </form>
    </div>
  )
}

export default UpdateProfileForm;