import { useSelector } from 'react-redux';
import Link from 'next/link';
import CreatePlanForm from '../../components/createPlanForm';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer'
const CreatePlan = () => {
 
  return (
    <div>
     <CreatePlanForm></CreatePlanForm>
     
    </div>
  )
}

export default CreatePlan;