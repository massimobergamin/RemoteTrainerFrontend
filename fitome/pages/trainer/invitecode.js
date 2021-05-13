import Link from 'next/link'
const Trainer = () => {

  
  return (
    <div>
      <Link href="./workouts">
      <h1>Workouts</h1>
      </Link>
      <Link href="./exercise">
      <h1>Exercises</h1>
      </Link>
      <Link href="./plans">
      <h1>Plans</h1>
      </Link>
      <Link href="./appointments">
      <h1>Appointments</h1>
      </Link>
      <Link href="/profile">
      <h1>Profile</h1>
      </Link>
      <h1></h1>
    </div>
  )
}

export default Trainer;

// creating  plan
// view his appointments
// profile

// client landing page
// view appointment
// view owkrout 
// view plan
// view exercises
// profile 