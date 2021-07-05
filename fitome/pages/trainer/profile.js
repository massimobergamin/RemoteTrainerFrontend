import { useEffect, useState } from 'react';
import { useAuth } from '../../firebase/contextAuth'
import { useSelector } from 'react-redux';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { getUserById, getInviteCode, getClients } from '../../redux/trainer';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import moment from 'moment';
import Loader from '../../components/loader';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();
  const { user, invite_code, clients } = useSelector(state => state.trainer);
  const router = useRouter();
  const userBirthday = moment(user.birthday).format('LL');

  useEffect(() => {
    setLoading(true);
    dispatch(getInviteCode(currentUser.uid));
    dispatch(getUserById(currentUser.uid));
    dispatch(getClients(currentUser.uid)).then(setLoading(false));
  }, [])

  if (loading) return <Loader/>;

  return (
    <div>
      <div className="page_container">
        <div className="createprofile_wrapper">
          <div className="page_title">{user.first_name + " " + user.last_name}</div>
          <div className="profilewrapper">
            {user.profile_picture ?
              <img src={user.profile_picture} className="profilePic"/>
              :
              <img className="profilePic" src="/noVid.png"></img>}
          </div>
          <span className="profile_addImage">@{user.username}</span>
          {clients.length === 1 ? <div>You currently have <b>1</b> client.</div> : <div>You currently have <b>{clients.length}</b> clients.</div>}
            <a href="./editprofile">
              <button className="buttonCancel profile_marginBottom">Edit Profile</button>
            </a>
            <div><b>Invite code:</b><br/>{invite_code?.invite_code}</div>
            <div><b>Birthday:</b><br/>{userBirthday}</div>
            <div><b>Height:</b><br/>{user.height} cm</div>

            <div><b>Weight:</b><br/>{user.weight} lbs</div>
            <div><b>Sex:</b><br/>{user.sex}</div>

            <a style={{fontSize: "0.9rem", color: "#585858"}} href="" onClick={(e) => {
              e.preventDefault();
              logout();
              router.push('/');
            }}><u>Sign Out</u></a>
          </div>
        </div>
        <NavigationTrainer></NavigationTrainer>
      </div>
  )
}

export default Profile;