import { useSelector } from 'react-redux';
import Link from 'next/link';
import CreatePlanForm from '../../components/createPlanForm';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer'
const CreatePlan = () => {
 
  return (
    <div>
      <div className="page_container">
      <CreatePlanForm/>
     </div>
     <NavigationTrainer/>
    </div>
  )
}

export default CreatePlan;