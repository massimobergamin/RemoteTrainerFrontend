import { useEffect } from 'react';
import { useAuth } from '../../firebase/contextAuth'
import { useSelector } from 'react-redux';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { getUserById, getInviteCode, getClients } from '../../redux/trainer';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();
  const { user, invite_code, clients } = useSelector(state => state.trainer);
  const router = useRouter();

  useEffect(() => {
    dispatch(getInviteCode(currentUser.uid));
    dispatch(getUserById(currentUser.uid));
    dispatch(getClients(currentUser.uid));
  }, [])

  return (
    <div>
      {console.log(clients)}
      <p>{user.first_name + " " + user.last_name}</p>
      {user.profile_picture ?
        <img src={user.profile_picture} className="profilePic"/>
      :
      <img className="profilePic" src="/noVid.png"></img>}
      <p>{user.username}</p>
        <a href="./editprofile">
          <button className="button">Edit Profile</button>
        </a>
        {clients.length === 1 ? <p>You currently have 1 client.</p> : <p>You currently have {clients.length} clients.</p>}
        <div><b>Invite code:</b><br/>{invite_code?.invite_code}</div>
        <div><b>Birthday:</b><br/>{user.birthday}</div>
        <div><b>Height:</b><br/>{user.height}</div>

        <div><b>Weight:</b><br/>{user.weight}</div>
        <div><b>Sex:</b><br/>{user.sex}</div>

        <a href="" onClick={(e) => {
          e.preventDefault();
          logout();
          router.push('/');
        }}><u>Sign Out</u></a>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Profile;