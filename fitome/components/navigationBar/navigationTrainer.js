import React from 'react'
import Link from 'next/link';

const NavigationTrainer = () => {
    return (
        <ul className="navigationBar_container">
            <Link href="/trainer/workouts">
                <li className="navigationBar_icon">
                    <img className="navigationBar_image" src="/icons/fitness_center_white_24dp.svg"/>
                </li>
            </Link>
            <Link href="/trainer/sessionList">
                <li className="navigationBar_icon">
                    <img className="navigationBar_image" src="/icons/call_white_24dp.svg"/>
                </li>
            </Link>
            <Link href="/trainer/clientAssignment">
                <li className="navigationBar_icon">
                    <img className="navigationBar_image" src="/icons/inventory_white_24dp.svg"/>
                </li>
            </Link>
            <Link href="/trainer/profile">
                <li className="navigationBar_icon">
                    <img className="navigationBar_image" src="/icons/account_circle_white_24dp.svg"/>
                </li>
            </Link>
        </ul>
    )
}

export default NavigationTrainer
