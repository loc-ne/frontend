import React, { useState, useEffect } from 'react';
import MyContextUser from './MyContextUser';
import MyContextCart from './MyContextCart';
import useCart from './useCart';

const MyProviderUser = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [userId, setUserId] = useState(null);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    const checkLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/check_login', {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok && data.message === 'User is logged in') {
                login();
                console.log(data.userId)
                setUserId(data.userId);
            } else {
                logout();
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            logout();
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);
    
 
    return (
        <MyContextUser.Provider value={{ isLoggedIn, login, logout, userId, setUserId , checkLogin}}>
                {children}
        </MyContextUser.Provider>
    );
};

export default MyProviderUser;
