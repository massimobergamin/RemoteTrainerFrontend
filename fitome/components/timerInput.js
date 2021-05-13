import React, { useState } from 'react'


const TimerInput = () => {
  // const initState = {
  //   hours: 0,
  //   minutes: 0, 
  //   seconds: 0,
  // };

  // const [timerInput, setTimerInput] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimerInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="timer_input">
        <input type="number" min="0" name="hours" value={timerInput.hours} onChange={handleChange}></input>
        <label>Hours</label>
        <input type="number" min="0" name="minutes" value={timerInput.minutes} onChange={handleChange}></input>
        <label>Minutes</label>
        <input type="number" min="0" name="seconds" value={timerInput.seconds} onChange={handleChange} className="timer_input_seconds"></input>
        <label>Seconds</label>
      </div>
    </div>
  )
}

export default TimerInput
