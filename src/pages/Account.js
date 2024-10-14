import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams} from 'react-router-dom';
import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import MyContextUser from '../MyContextUser';
import Dashboard from '../components/Dashboard';


const Account = () => {
    const [searchParams] = useSearchParams();
    const Register = searchParams.get('register');
    const Login = searchParams.get('login');
    const { isLoggedIn } = useContext(MyContextUser);

    const [activeTab, setActiveTab] = useState(() => {
        if (Login) return 'login';
        if (Register) return 'register';
        return '';
    });

    useEffect(() => {
        if (!isLoggedIn) {
            if (Login) {
                setActiveTab('login');
            } else if (Register) {
                setActiveTab('register');
            }
        } else {
            setActiveTab('');
        }
    }, [searchParams, isLoggedIn]);

    return (
        <div>
            <Navbar />
            {isLoggedIn ? (
                <Dashboard />
            ) : (
                <div className="flex justify-center space-x-8 mt-40">
                    <div
                        className={`text-2xl cursor-pointer ${activeTab === 'login' ? 'border-b-2 border-gray-500' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </div>
                    <div
                        className={`text-2xl cursor-pointer ${activeTab === 'register' ? 'border-b-2 border-gray-500' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </div>
                </div>
            )}
            {activeTab === 'login' && <LoginForm />}
            {activeTab === 'register' && <RegisterForm />}
            <Footer />
        </div>
    );
};

export default Account;