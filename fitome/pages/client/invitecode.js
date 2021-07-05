import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {useAuth} from '../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainerByCode } from '../../redux/client';
import { postClient } from '../../redux/trainer';
import Loader from '../../components/loader';


const TrainerCode = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const code = input.toUpperCase();
    await dispatch(getTrainerByCode(code))
      .then(response => {
        const client = currentUser.uid;
        const trainer = response.payload.data.user_uid;
        if (trainer && client) {
          dispatch(postClient({trainer_uid: trainer , client_uid: client})).then(setLoading(false));
          router.push('/client/editprofile');
        } else {
          setLoading(false);
          alert('Trainer does not exist...');
        }
      }).catch(error => {
        setLoading(false); 
        console.error(error);
        alert('Trainer does not exist...'); 
      });
  };

  if (loading) return <Loader/>;

  return (
    <div className="initial_background">
      <img className="initial_decor" src="/decor_background.png"/>
      <img className="initial_wave" src="/wave.png"/>
      <div className="signup_wrapper">
        <div className="signup_code_welcome">Welcome to</div>
        <img className="initial_logo" src="/fitome_orange.png"/>
        <div className="signup_code_title">Please enter your trainer's invite code below:</div>
        <label className="signup_input" htmlFor="code">Trainer's Code:</label>
        < input  className="trainercode_input" type="text" name="code" value={input} onChange={handleChange}></input>
        <button className="signup_button" type="button" onClick={handleSubmit}>Connect</button>
      </div>
    </div>
  )
}

export default TrainerCode