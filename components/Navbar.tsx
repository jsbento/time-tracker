import React from "react";


const NavBar: React.FC = () => {
    return (
        <>
            <ul className="flex justify-end items-center p-8 gap-5 text-white bg-blue-900">
                <li className="mr-auto">Logo</li>
                <li className="hover:scale-105 font-bold">
                    <a href="/profile">Profile</a>
                </li>
                <li className="hover:scale-105 font-bold">
                    <a href="/time">Time</a>
                </li>
                <li className="hover:scale-105 font-bold">
                    <a href="/pay">Pay</a>
                </li>
            </ul>
        </>
    )
}

export default NavBar;