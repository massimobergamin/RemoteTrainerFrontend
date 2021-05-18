import React, { useEffect } from 'react';
import { useAuth } from '../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import NavigationClient from '../../components/navigationBar/navigationClient';
import { getUser } from '../../redux/client';


// TODO: Render page based off trainer profile template
const Profile = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.client);

  useEffect(() => {
    dispatch(getUser(currentUser.uid));
  }, []);


  return (
    <div>
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
      <NavigationClient></NavigationClient>
    </div>
    </div>
  )
}

export default Profile
