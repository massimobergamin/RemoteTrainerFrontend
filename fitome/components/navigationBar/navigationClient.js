import React from 'react'
import Link from 'next/link';

function navigationClient() {
    return (
        <ul className="navigationBar_container">
            <Link href="/client/workout">
                <li className="navigationBar_icon"> 
                    <img src="/icons/fitness_center_white_24dp.svg"/>
                </li>
            </Link>
            <Link href="/client/sessionList">
                <li className="navigationBar_icon"> 
                    <img src="/icons/call_white_24dp.svg"/>
                </li>
            </Link>
            <Link href="/client/profile">
                <li className="navigationBar_icon">
                    <img src="/icons/account_circle_white_24dp.svg"/>
                </li>
            </Link>
        </ul>
    )
}

export default navigationClient
