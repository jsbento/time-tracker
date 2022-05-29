import React from "react";
import Logo from "./Logo";

const NavBar: React.FC = () => {
    const logout = () => {
        window.sessionStorage.clear();
        window.location.href = "/login";
    }

    return (
        <>
            <ul className="flex justify-end items-center p-6 gap-5 text-white bg-blue-900">
                <li className="mr-auto"><Logo/></li>
                <li className="hover:scale-105 font-bold">
                    <a href="/profile">Profile</a>
                </li>
                <li className="hover:scale-105 font-bold">
                    <a href="/time">Time</a>
                </li>
                <li className="hover:scale-105 font-bold">
                    <a href="/pay">Pay</a>
                </li>
                <li className="hover:scale-105 font-bold">
                    {typeof window !== 'undefined' && window.sessionStorage.getItem('user') ? 
                        <button className="font-bold" onClick={() => logout()}>Logout</button> :
                        <a href="/login">Login</a>
                    }
                </li>
            </ul>
        </>
    );
}

export default NavBar;