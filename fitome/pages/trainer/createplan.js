import { useSelector } from 'react-redux';
import Link from 'next/link';
import CreatePlanForm from '../../components/createPlanForm';

const CreatePlan = () => {
 
  return (
    <div>
     <CreatePlanForm></CreatePlanForm>
    </div>
  )
}

export default CreatePlan;