import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <ul className="breadcrumb flex space-x-2 text-black mt-40 mb-4 ml-96">
                <li className="flex items-center font-bold">
                    <a href="#">Home</a>
                    <span className="mx-2">•</span>
                </li>
                <li className="flex items-center font-bold">
                    <a href="#">Account</a>
                </li>
            </ul>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                    <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                    <h2 className="text-xl font-bold mb-6">My account</h2>
                    <div className="mb-6">
                        <button className="text-red-500 hover:underline font-semibold">LOGOUT</button>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <span className="font-medium text-gray-700">Profile</span>
                            <button className="text-blue-500 hover:underline">EDIT PROFILE</button>
                        </div>
                        <div className="text-gray-800">
                            <div className="mb-2">
                                <span className="font-semibold">Full Name</span>: loc quoc
                            </div>
                            <div>
                                <span className="font-semibold">Email</span>: locnguyen@gmail.com
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <span className="font-medium text-gray-700">Password</span>
                            <button className="text-blue-500 hover:underline">CHANGE PASSWORD</button>
                        </div>
                        <div className="text-gray-800">
                            <span className="font-semibold">Password</span>: ••••••••••
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-700 mb-4">Preferences</div>
                        <div>
                            <button className="text-blue-500 hover:underline block mb-2">NEWSLETTER PREFERENCES</button>
                            <button className="text-blue-500 hover:underline block">NOTIFICATION PREFERENCES</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
