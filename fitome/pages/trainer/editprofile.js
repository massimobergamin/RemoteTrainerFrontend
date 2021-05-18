import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/contextAuth'
import { useSelector } from 'react-redux';
import UpdateProfileForm from '../../components/updateProfileForm';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { getUserById, updateUser } from '../../redux/trainer';
import { useDispatch } from 'react-redux';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { user } = useSelector(state => state.trainer);

  useEffect(() => {
    console.log(currentUser)
    dispatch(getUserById(currentUser.uid))
  }, [])

  return (
    <div>
      <div className="pageContainer">
      <UpdateProfileForm></UpdateProfileForm>
      </div>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default EditProfile;