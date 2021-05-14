import React, { useState } from 'react'

const TrainerCode = () => {
  const [input, setInput] = useState('');


  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (tCode) => {
    // check against db to see if trainer code exists
      // if true
        // add both uid's to trainer_client rel table in db
        // route to sessions page
      // if false 
        // show alert that trainer id does not exist
  };


  return (
    <div className="pageContainer">
      <input type="text" value={input} onChange={handleChange} onSubmit={handleSubmit}></input>
    </div>
  )
}

export default TrainerCode