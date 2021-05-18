import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/contextAuth'
import { useSelector } from 'react-redux';
import UpdateProfileForm from '../../components/updateProfileForm';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { updateUser, getUserById, getInviteCode } from '../../redux/trainer';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { user, invite_code } = useSelector(state => state.trainer);

  useEffect(() => {
    dispatch(getInviteCode(currentUser.uid))
    dispatch(getUserById(currentUser.uid))
  }, [])

  return (
    <div>
      <p>{user.first_name + " " + user.last_name}</p>
      {user.profile_picture ?
        <img src={user.profile_picture} className="profilePic" width="176" height="176"/>
      :
      <img  className="profilePic" src="/noVid.png" width="176" height="176"></img>}
      <p>{user.username}</p>
        <a href="./editprofile">
          <button className="button">Edit Profile</button>
        </a>
        <p>Invite a client: {invite_code.invite_code}</p>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Profile;