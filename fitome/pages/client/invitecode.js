import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {useAuth} from '../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainerByCode } from '../../redux/client';
import { postClient } from '../../redux/trainer';


const TrainerCode = () => {
  const [input, setInput] = useState('');

  const router = useRouter();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    const code = input.toUpperCase();
    await dispatch(getTrainerByCode(code))
      .then(response => {
        const client = currentUser.uid;
        const trainer = response.payload.data.user_uid;
        if (trainer && client) {
          dispatch(postClient({trainer_uid: trainer , client_uid: client}));
          router.push('/client/editprofile');
        } else { 
          alert('Trainer does not exist...');
        }
      }).catch(error => { 
        console.error(error);
        alert('Trainer does not exist...'); 
      });
  };


  return (
    <div className="pageContainer">
      <h2>Welcome to Fitome!</h2>
      <h4>Please enter your Trainer's invite code below:</h4>
      <input type="text" value={input} onChange={handleChange} placeholder="Trainer code..."></input>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default TrainerCode