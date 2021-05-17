import React from 'react';
import Link from 'next/link';

const PlansBar = () => {
    return (
        <ul className="workoutsExercisesBar_container">
            <Link href="./createplan">
                <li className="workoutsExercisesBar_icon">
                  <p>Create Plan</p>
                </li>
            </Link>
            <Link href="./plans">
                <li className="workoutsExercisesBar_icon">
                    <p>View Plans</p>
                </li>
            </Link>
        </ul>
    )
}

export default PlansBar;
