import React, { useEffect, useState } from 'react';
import { useAuth } from '../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import NavigationClient from '../../components/navigationBar/navigationClient';
import { getUser } from '../../redux/client';
import { getUserById } from '../../redux/trainer';
import moment from 'moment';
import { useRouter } from 'next/router';
import Loader from '../../components/loader';


const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();
  const { user, trainerInfo } = useSelector(state => state.client);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    dispatch(getUser(currentUser.uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
    dispatch(getUserById(trainerInfo.trainer_uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const trainer = useSelector(state => state.trainer);
  const userBirthday = moment(user.birthday).format('LL');

  if (loading) {
    return (
      <div>
        <div className="loader_wrapper">
          <Loader/>
        </div>
        <NavigationClient/>
      </div>
    )
  }

  return (
    <div>
      <div className="page_container">
        <div className="page_title">{user.first_name + " " + user.last_name}</div>
        <div className="createprofile_wrapper">
        <div className="profile_top">
          <div className="profilewrapper">
            {user.profile_picture ?
              <img className="profilePic" src={user.profile_picture}>
              </img> :
            <img className="profilePic" src="/noVid.png"></img>}
          </div>
          <span className="profile_addImage">@{user.username}</span>
            <div>Your current trainer is <b>{trainer.user.first_name} {trainer.user.last_name}</b>.</div>
            <a href="./editprofile">
              <button className="buttonCancel profile_marginBottom">Edit Profile</button>
            </a>
            <a className="profile_signout_large" style={{fontSize: "0.9rem", color: "#585858"}} href="" onClick={(e) => {
            e.preventDefault();
            logout();
            router.push('/');
          }}><u>Sign Out</u></a>
        </div>
        <div className="profile_bottom">
          <div><b>Birthday:</b><br/>{userBirthday}</div>
          <div><b>Height:</b><br/>{user.height} cm</div>
          <div><b>Weight:</b><br/>{user.weight} lbs</div>
          <div><b>Sex:</b><br/>{user.sex}</div>
          <a className="profile_signout_small" style={{fontSize: "0.9rem", color: "#585858"}} href="" onClick={(e) => {
            e.preventDefault();
            logout();
            router.push('/');
          }}><u>Sign Out</u></a>
        </div>
      </div>
    </div>
    <NavigationClient/>
    </div>
  )
}

export default Profile
