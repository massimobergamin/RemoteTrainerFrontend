import { useEffect } from 'react';
import { useAuth } from '../../firebase/contextAuth'
import { useSelector } from 'react-redux';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { getUserById, getInviteCode } from '../../redux/trainer';
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
  }, [])

  return (
    <div>
      <p>{user.first_name + " " + user.last_name}</p>
      {user.profile_picture ?
        <img src={user.profile_picture} className="profilePic"/>
      :
      <img className="profilePic" src="/noVid.png"></img>}
      <p>{user.username}</p>
        <a href="./editprofile">
          <button className="button">Edit Profile</button>
        </a>
        <p>You currently have {clients.length} clients.</p>
        <div>Invite a client: {invite_code?.invite_code}</div>
        <div>Birthday: <br/> {user.birthday}</div>
        <div>Height: <br/> {user.height}</div>

        <div>Weight: <br/> {user.weight}</div>
        <div>Sex: <br/> {user.sex}</div>

        <a href="" onClick={(e) => {
          e.preventDefault();
          logout();
          router.push('/');
        }}>Sign Out</a>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Profile;