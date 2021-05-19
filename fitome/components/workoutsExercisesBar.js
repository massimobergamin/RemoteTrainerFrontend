import React from 'react';
import Link from 'next/link';

const WorkoutsExercisesBar = ({landingpage1, landingpage2}) => {
    return (
        <ul className="workoutsExercisesBar_container">
            <Link href="/trainer/workouts">
                <li className={`workoutsExercisesBar_workout ${landingpage1}`}>
                  <p>Workouts</p>
                </li>
            </Link>
            <Link href="/trainer/exercises">
                <li className={`workoutsExercisesBar_exercise ${landingpage2}`}>
                    <p>Exercises</p>
                </li>
            </Link>
        </ul>
    )
}

export default WorkoutsExercisesBar;
