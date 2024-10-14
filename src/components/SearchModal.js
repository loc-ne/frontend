import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import S1 from '../assets/images/s1.jpg';
import S2 from '../assets/images/s2.jpg';
import S3 from '../assets/images/s3.jpg';
import S4 from '../assets/images/s4.jpg';

const SearchModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = () =>
    {
        navigate(`/search?k=${searchValue}`);
        onClose()
    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-7xl">
                <div className="flex justify-between items-center border-b p-6">
                    <input
                        type="text"
                        className="w-full p-4 border rounded-md text-xl"
                        placeholder="SEARCH KANGYOO.COM"
                        value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button onClick={handleSearch}>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_15_152)">
                                <rect width="24" height="24" fill="white" />
                                <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" stroke-linejoin="round" />
                                <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#000000" />
                            </g>
                            <defs>
                                <clipPath id="clip0_15_152">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-600 ml-4 text-2xl"
                    >
                        &#x2715;
                    </button>

                </div>
                <div className="p-6 grid grid-cols-2 gap-12">
                    <div>
                        <h2 className="font-bold mb-6 text-2xl text-black">TRENDING SEARCHES</h2>
                        <ul className="space-y-4 block">
                            <li>
                                <p href="#" className="cursor-pointer text-blue-500 text-lg hover:underline hover:text-blue-700">
                                    Lifestyle
                                </p>
                            </li>
                            <li>
                                <p href="#" className="cursor-pointer text-blue-500 text-lg hover:underline hover:text-blue-700">
                                    Palermo
                                </p>
                            </li>
                            <li>
                                <p href="#" className="cursor-pointer text-blue-500 text-lg hover:underline hover:text-blue-700">
                                    Classic
                                </p>
                            </li>
                            <li>
                                <p href="#" className="cursor-pointer text-blue-500 text-lg hover:underline hover:text-blue-700">
                                    Suede
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-bold mb-6 text-2xl">SUGGESTED PRODUCTS</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-start space-x-4">
                                <img src={S1} alt="Product 1" className="w-24 h-24 object-cover" />
                                <div>
                                    <p className="font-semibold text-lg">Easy Rider Vintage Sneakers</p>
                                    <p className="text-gray-600 text-lg">$90.00</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <img src={S2} alt="Product 2" className="w-24 h-24 object-cover" />
                                <div>
                                    <p className="font-semibold text-lg">Roma Skyline Flagship Sneakers</p>
                                    <p className="text-gray-600 text-lg">$100.00</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <img src={S3} alt="Product 3" className="w-24 h-24 object-cover" />
                                <div>
                                    <p className="font-semibold text-lg">Suede XL Sneakers</p>
                                    <p className="text-gray-600 text-lg">$85.00</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <img src={S4} alt="Product 3" className="w-24 h-24 object-cover" />
                                <div>
                                    <p className="font-semibold text-lg">Suede XL Sneakers</p>
                                    <p className="text-gray-600 text-lg">$85.00</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
