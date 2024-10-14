import {React, useContext} from 'react';
import { Outlet } from 'react-router-dom';
import useCart from './useCart';
import MyContextUser from './MyContextUser';

const Layout = () => {
    const { isLoggedIn, login, logout ,userId, setUserId} = useContext(MyContextUser);
    useCart(userId);

    return (
        <div>
            <header>
                {/* Your header code here */}
            </header>
            <main>
                <Outlet /> {/* Renders the matched route's component */}
            </main>
            <footer>
                {/* Your footer code here */}
            </footer>
        </div>
    );
};

export default Layout;
