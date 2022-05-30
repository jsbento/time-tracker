import React from "react";

const AuthNav: React.FC = () => {
    const logout = () => {
        window.sessionStorage.clear();
        window.location.href = "/login";
    }

    return (
        <>
            <li className="hover:scale-105 font-bold">
                <a href="/profile">Profile</a>
            </li>
            <li className="hover:scale-105 font-bold">
                <a href="/time">Time</a>
            </li>
            <li className="hover:scale-105 font-bold">
                <a href="/pay">Pay</a>
            </li>
            <li className="hover:scale-105">
                <button className="font-bold" onClick={() => logout()}>Logout</button>
            </li>
        </>
    );
}

export default AuthNav;