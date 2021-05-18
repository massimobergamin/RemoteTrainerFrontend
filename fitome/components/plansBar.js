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
            <Link href="./clients">
                <li className="workoutsExercisesBar_icon">
                    <p>Clients</p>
                </li>
            </Link>
        </ul>
    )
}

export default PlansBar;
