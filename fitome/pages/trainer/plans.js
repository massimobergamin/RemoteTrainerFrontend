import { useSelector } from 'react-redux';
import Link from 'next/link';
import CreatePlanForm from '../../components/createPlanForm';

const Plans= () => {
  let createPlan = true;

  const handleChange = (e) => {
    e.preventDefault();
   createPlan = !createPlan
   console.log(createPlan)
  }

  return (
    <div>
      <h1>Plans</h1>
      <Link href="./createplan">
      <a>
      <h2>Create Plans</h2>
      </a>
      </Link>
      <h3>All Plans</h3>
    </div>
  )
}

export default Plans;