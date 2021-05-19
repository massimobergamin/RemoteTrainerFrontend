import Link from 'next/link'
import NavigationTrainer from '../../components/navigationBar/navigationTrainer'
import { getInviteCode, getUserById } from '../../redux/trainer';
import { useAuth } from '../../firebase/contextAuth';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useRouter} from 'next/router';

const Trainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useAuth();
  
  useEffect(() => {
    console.log(currentUser)
    dispatch(getInviteCode(currentUser.uid))
    dispatch(getUserById(currentUser.uid))
  }, [])
  const { user, invite_code, trainer } = useSelector(state => state.trainer);

  
  return (
    <div className="initial_background">
      <img className="initial_decor" src="/decor_background.png"/>
      <img className="initial_wave" src="/wave.png"/>
      <div className="signup_wrapper">
        <div className="signup_code_welcome">Welcome to</div>
        <img className="initial_logo" src="/fitome_orange.png"/>
        <div className="signup_code_title">Start inviting your clients with this code</div>
        <p className="signup_code">{invite_code?.invite_code}</p>
        <a href="./profile">
          <button className="signup_button" onClick={()=> router.push('/trainer/editprofile')}>Continue</button>
        </a>
      </div>
    </div>
  )
}

export default Trainer;