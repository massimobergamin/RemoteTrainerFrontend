import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/contextAuth'
import { useSelector } from 'react-redux';
import UpdateProfileForm from '../../components/updateProfileForm';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { updateUser, getUserById } from '../../redux/trainer';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { user } = useSelector(state => state.trainer);

  useEffect(() => {
    console.log(currentUser)
    dispatch(getUserById(currentUser.uid))
    console.log("USER", user)
  }, [])

  return (
    <div>
      <p>{user.first_name + " " + user.last_name}</p>
      {user.profile_picture ?
        <img className="profilePic" id="Exercise_Video" width="176" height="176" autoPlay={true} loop={true}>
            <source src={user.profile_picture} type="jpg"/>
            Your browser does not support HTML5 video.
        </img> :
      <img  className="profilePic" src="/noVid.png" width="176" height="176"></img>}
      <p>{user.username}</p>
        <a href="./editprofile">
          <button className="button">Edit Profile</button>
        </a>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Profile;