import React from 'react';
import Link from 'next/link';

const WorkoutsExercisesBar = () => {
    return (
        <ul className="workoutsExercisesBar_container">
            <Link href="/trainer/workouts">
                <li className="workoutsExercisesBar_icon">
                  <p>Workouts</p>
                </li>
            </Link>
            <Link href="/trainer/exercises">
                <li className="workoutsExercisesBar_icon">
                    <p>Exercises</p>
                </li>
            </Link>
        </ul>
    )
}

export default WorkoutsExercisesBar;
