import Link from 'next/link'
import NavigationTrainer from '../../components/navigationBar/navigationTrainer'
import { getInviteCode, getUserById } from '../../redux/trainer';
import { useAuth } from '../../firebase/contextAuth';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CopyToClipboard } from "react-copy-to-clipboard";

const Trainer = () => {
  const dispatch = useDispatch();


  const { currentUser } = useAuth();
  
  useEffect(() => {
    console.log(currentUser)
    dispatch(getInviteCode(currentUser.uid))
    dispatch(getUserById(currentUser.uid))
  }, [])
  const { user, invite_code, trainer } = useSelector(state => state.trainer);

  
  return (
    <div>
      <h3>Start inviting your clients with this code</h3>
        <p>{invite_code?.invite_code}</p>
        <a href="./profile">
          <button className="button">Continue to Profile</button>
        </a>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Trainer;