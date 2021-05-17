import Link from 'next/link'
import NavigationTrainer from '../../components/navigationBar/navigationTrainer'
import { getInviteCode, getUserById } from '../../redux/trainer';
import { useAuth } from '../../firebase/contextAuth';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Trainer = () => {
  const dispatch = useDispatch();


  //let inviteCode = '';
  const { currentUser } = useAuth();
  const { user, invite_code, trainer } = useSelector(state => state.trainer);
  useEffect(() => {
    dispatch(getInviteCode(currentUser.uid))
    dispatch(getUserById(currentUser.uid))
  }, [])

  return (
    <div>
      <h1></h1>
      {console.log(user)}
      <h3>Start inviting your clients with this code</h3>
      <p>{invite_code}</p>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Trainer;

// creating  plan
// view his appointments
// profile

// client landing page
// view appointment
// view owkrout
// view plan
// view exercises
// profile