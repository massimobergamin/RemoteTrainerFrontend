import { useSelector } from 'react-redux';
import Link from 'next/link';
import CreatePlanForm from '../../components/createPlanForm';
import PlansBar from '../../components/plansBar'
import { getPlan } from '../../redux/trainer'
import { useAuth } from '../../firebase/contextAuth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer'

const Plans= () => {
  const dispatch = useDispatch();
  let createPlan = true;

  const { user, clients, workouts, plans } = useSelector(state => state.trainer);
  const { currentUser } = useAuth();
  //figure out if we should getAllPlans
  //need to make a function for that
  useEffect(() => {
    console.log(plans)
    const currentPlans = {
      //will change to trainer_uid
      client_uid: currentUser.uid,
      start_date: Date.now()
    }
    dispatch(getPlan(currentPlans))
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
   createPlan = !createPlan
   console.log(createPlan)
  }

  return (
    <div>
      <PlansBar></PlansBar>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default Plans;