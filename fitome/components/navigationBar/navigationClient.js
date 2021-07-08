import Link from 'next/link';

const NavigationClient = () => {
    return (
        <ul className="navigationBar_container">
            <Link href="/client/plan">
                <li className="navigationBar_icon">
                    <img className="navigationBar_image" src="/icons/fitness_center_white_24dp.svg"/>
                </li>
            </Link>
            <Link href="/session">
                <li className="navigationBar_icon">
                    <img className="navigationBar_image" src="/icons/call_white_24dp.svg"/>
                </li>
            </Link>
            <Link href="/client/profile">
                <li className="navigationBar_icon">
                    <img className="navigationBar_image" src="/icons/account_circle_white_24dp.svg"/>
                </li>
            </Link>
        </ul>
    )
}

export default NavigationClient;
