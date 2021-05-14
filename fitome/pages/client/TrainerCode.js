import React, { useState } from 'react'
import {useAuth} from '../../firebase/contextAuth'
import { useDispatch, useSelector } from 'react-redux';
import { checkTrainerCode } from '../../redux/client';


const TrainerCode = () => {
  const [input, setInput] = useState('');

  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (tCode) => {
    dispatch(checkTrainerCode(tCode))
      .then(/* TODO */);
    // check against db to see if trainer code exists
      // if true
        // add both uid's to trainer_client rel table in db
        // route to sessions page
      // if false 
        // show alert that trainer id does not exist
  };


  return (
    <div className="pageContainer">
      <input type="text" value={input} onChange={handleChange} placeholder="Enter your trainer's code..."></input>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default TrainerCode