import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MyContextUser from '../MyContextUser';
import MyContextCart from '../MyContextCart';

const DropdownUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, login, logout, userId } = useContext(MyContextUser);
    const { clearCart } = useContext(MyContextCart);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                if (data.message === 'Logged out successfully') {
                    logout();
                    localStorage.removeItem("user_id");
                    navigate('/');
                    window.location.reload();
                    clearCart();
                }
            } else {
                throw new Error(data.message || 'Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleAccount = (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            navigate('/account?login=true')
        } else {
            navigate('/account')
        }
    }


    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full focus:outline-none"
            >
                <svg fill="white" width="27px" height="27px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title /><path d="M69.3677,51.0059a30,30,0,1,0-42.7354,0A41.9971,41.9971,0,0,0,0,90a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6A41.9971,41.9971,0,0,0,69.3677,51.0059ZM48,12A18,18,0,1,1,30,30,18.02,
18.02,0,0,1,48,12ZM12.5977,84A30.0624,30.0624,0,0,1,42,60H54A30.0624,30.0624,0,0,1,83.4023,84Z"/></svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a onClick={handleAccount} href="#" className="block px-6 py-3 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">My Account</a>
                        <a href="#" className="block px-6 py-3 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">Contact Us</a>
                        <a href="#" className="block px-6 py-3 text-lg text-gray-700 hover:bg-gray-100" role="menuitem">
                            <div className="flex items-center">
                                Language
                                <span className="ml-2">EN</span>
                                <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="Flag" className="w-6 h-6 ml-2" />
                            </div>
                        </a>
                        {!isLoggedIn && (
                            <div className="py-1">
                                <Link to="/account?login=true">
                                    <button className="w-full text-center block px-6 py-3 text-lg text-white bg-black hover:bg-gray-800" role="menuitem">LOGIN</button>
                                </Link>
                                <Link to="/account?register=true">
                                    <button className="w-full text-center block px-6 py-3 text-lg text-black border border-gray-300 hover:bg-gray-100" role="menuitem">REGISTER HERE</button>
                                </Link>
                            </div>
                        )}
                        {isLoggedIn && (

                            <div className="py-1">
                                <Link to="/order_overview">
                                    <button className="w-full text-center block px-6 py-3 text-lg text-black border border-gray-300 hover:bg-gray-100" role="menuitem">TRACK ORDER</button>
                                </Link>
                                <button onClick={handleLogout} className="w-full text-center block px-6 py-3 text-lg text-white bg-black hover:bg-gray-800" role="menuitem">LOGOUT</button>
                            </div>

                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownUser;
