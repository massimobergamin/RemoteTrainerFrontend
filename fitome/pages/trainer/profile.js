import { useState } from 'react';
import { useAuth } from '../../firebase/contextAuth'
import { useSelector } from 'react-redux';
import UpdateProfileForm from '../../components/updateProfileForm';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer'
import { updateUser } from '../../redux/trainer';
import { useDispatch } from 'react-redux';

const Profile = () => {
  
  const { user } = useSelector(state => state.trainer);

  return (
    <div>
      <p>{user.first_name + " " + user.last_name}</p>
      <UpdateProfileForm></UpdateProfileForm>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Profile;