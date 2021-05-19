import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUser, addPlanNotes } from '../../redux/client'
import { useAuth } from '../../firebase/contextAuth';
import NavigationClient from '../../components/navigationBar/navigationClient';
import moment from 'moment';
import WorkoutDetails from '../../components/workoutDetails';


// displays client's workout plan + exercises
const Plan = () => {

  // const [inputBoxStatus, setInputBox] = useState(false)
  // const [noteState, setNoteState] = useState('')

  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(currentUser.uid));
  }, []);

  const client = useSelector(state => state.client);
  console.log('client: ', client);

  // //set inputBox to true and shows the input box
  // const addNotesHandler = () => {
  //   setInputBox(true)
  // }
  //****note sure how to grab current ID */
  // const UpdatedNote = {
  //   notes: noteState,
  //   planId: currentPlanState.id
  // }

  // //sends the input to the backend and sets inputbox to false - hiding the input
  // const noteHandler = () => {
  //   dispatch(addPlanNotes(noteState))
  //   setInputBox(false)
  // }

  function renderPlan () {
    
    if (client.plans) {
      // console.log('client plans: ', client.plans);
      for (let i = 0; i < client.plans.length; i++) {
        let plan = client.plans[i];
        const startDate = plan.start_date
        const endDate = plan.end_date
        const today = Date.now();
        if (moment(today).isBetween(startDate, endDate)) {
          let curPlan = plan;
          // console.log('curPlan: ', curPlan);
          return (
            <div>
              <div className="clientplan_date">Beginning: {moment(startDate).format("dddd, MMMM Do YYYY")}</div>
              <div className="clientplan_date">Ending: {moment(endDate).format("dddd, MMMM Do YYYY")}</div>
              <div>
                {curPlan.details.map(day => (
                  <div>
                    <div className="clientplan_dates" key={day.id}>{moment(day.day).format("dddd, MMMM Do YYYY")}</div>
                    {/* <button className="button" onClick={() => addNotesHandler()}>Add Notes</button>
                    {inputBoxStatus ? (
                      <div>
                        <input onChange={(e) => setNoteState(e.currentTarget.value)}></input>
                        <button onClick={noteHandler}>submit</button>
                      </div>
                    ) : null } */}
                    <WorkoutDetails key={day.day} workout={day}></WorkoutDetails> 
                  </div>
                ))}
                </div>
            </div>
          );
        };
      };
    };
    };


  return (
    <div>
      <div className="page_container">
      <h1>{client.user.username}'s Training Plan</h1>
      {renderPlan()}
      </div>
      <NavigationClient />
    </div>
  )
}

export default Plan
