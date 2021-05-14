import Link from 'next/link'
import NavigationTrainer from '../../components/navigationBar/navigationTrainer'
import { getInviteCode } from '../../redux/trainer';
import { useAuth } from '../../firebase/contextAuth';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Trainer = () => {
  const dispatch = useDispatch();

  let inviteCode = '';
  const { currentUser } = useAuth();
  const { user, invite_code } = useSelector(state => state.trainer);
  useEffect(() => {
    inviteCode = dispatch(getInviteCode(currentUser.uid))
  })
  
  return (
    <div>
      <h1>{invite_code.invite_code}</h1>
      <h1>{user.user_uid}</h1>
      <h3>Start inviting your clients with this code</h3>
      <h1>{inviteCode}</h1>
      <Link href="./workouts">
      <h1>Workouts</h1>
      </Link>
      <Link href="./exercise">
      <h1>Exercises</h1>
      </Link>
      <Link href="./plans">
      <h1>Plans</h1>
      </Link>
      <Link href="./appointments">
      <h1>Appointments</h1>
      </Link>
      <Link href="/profile">
      <h1>Profile</h1>
      </Link>
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