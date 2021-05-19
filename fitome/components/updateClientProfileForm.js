import { useState } from 'react';
import { useAuth } from '../firebase/contextAuth'
import { useSelector, useDispatch } from 'react-redux';
import UploadImageForm from './uploadImageForm';
import { updateUser } from '../redux/client';
import { useRouter } from 'next/router';

const UpdateClientProfileForm = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const router = useRouter();

  const initialState = {
  };

  const [profileState, setProfileState] = useState(initialState);
  const[url, setURL] = useState("");
  const [file, setFile] = useState("")
  const { user } = useSelector(state => state.client);
  console.log('user', user);
  console.log('currentUser.uid: ', currentUser.uid);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({uid: currentUser.uid, userData: {...profileState, profile_picture: url ? url : user.profile_picture}}))
      .then(() => router.push('/client/profile'));
  };


  // types allowed for upload;
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

  return (
    <div className="createprofile_wrapper">
      <div className="page_title">Edit Profile</div>
           {/* <label htmlFor="profilePicture">Profile Picture: */}
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
          {/* </label> */}
       <form className="createprofile_form">
          <label htmlFor="weight">Weight (lb):</label>
            <input
            type="number"
            name="weight"
            value={profileState.weight}
            step="1"
            min="0"
            onChange={(e) => setProfileState({...profileState, weight: parseInt(e.target.value)})}/>
          <label  htmlFor="height">Height (cm): </label>
          <input
            type="number"
            name="height"
            value={profileState.height}
            step="1"
            min="0"
            onChange={(e) => setProfileState({...profileState, height: parseInt(e.target.value)})}/>

          <label  htmlFor="Birthday">Birthday:</label>

            <input
            type="date"
            name="birthday"
            value={profileState.birthday}
            min="2003-05-17"
            onChange={(e) => setProfileState({...profileState, birthday: e.target.value})}/>
          
          <label  htmlFor="sex">Sex:</label>

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
            <button className="button" type="submit"  onClick={e => handleSubmit(e)} disabled={url==='uploading'}>Save</button>
            <button className="button" type="button"  onClick={e => {
              router.push('/client/profile');
              }}>Cancel</button>
        </form>
    </div>
  )
}

export default UpdateClientProfileForm;