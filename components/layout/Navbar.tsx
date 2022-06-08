import React from "react";
import Logo from "./Logo";
import AuthNav from "./AuthNav";

const NavBar: React.FC = () => {
    return (
        <>
            <ul className="flex justify-between items-center p-6 gap-5 text-white bg-blue-900">
                <li className="mr-auto"><Logo/></li>
                {typeof window !== 'undefined' && window.sessionStorage.getItem('user') ? 
                    <AuthNav /> : <a className="hover:scale-105 font-bold" href="/login">Login</a>
                }
            </ul>
        </>
    );
}

export default NavBar;