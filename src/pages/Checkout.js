import React, { useState, useContext, useEffect } from 'react';
import Brand from '../assets/images/brand.png';
import MyContextCart from '../MyContextCart';
import MyContextUser from '../MyContextUser';
import { useNavigate } from 'react-router-dom';



const Checkout = () => {
    const [cityData, setCityData] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [cityName, setCityName] = useState('');

    const [districtData, setDistricData] = useState([]);
    const [selectedDistric, setSelectedDistric] = useState('');
    const [districName, setDistricName] = useState('');

    const [streetData, setStreetData] = useState([]);
    const [selectedStreet, setSelectedStreet] = useState('');

    const navigate = useNavigate();

    const fetchDataCity = async () => {
        try {
            const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setCityData(data.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchDataDistric = async () => {
        try {
            const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${selectedCity}.htm`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setDistricData(data.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchDataStreet = async () => {
        try {
            const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistric}.htm`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setStreetData(data.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataCity();
    }, []);

    useEffect(() => {
        fetchDataDistric();
    }, [districtData]);

    useEffect(() => {
        fetchDataStreet();
    }, [streetData]);

    const handleChangeCity = (event) => {
        setSelectedCity(event.target.value);
        const selectedCity = cityData.find(city => city.id === event.target.value);
        if (selectedCity) {
            setCityName(selectedCity.name);
        }

    };
    const handleChangeDistric = (event) => {
        setSelectedDistric(event.target.value);
        const selectedDistrict = districtData.find(district => district.id === event.target.value);
        if (selectedDistrict) {
            setDistricName(selectedDistrict.name);
        }
    };
    const handleChangeStreet = (event) => {
        setSelectedStreet(event.target.value);
    };

    const handlePaymentVnpay = async (event) => {
        event.preventDefault();
        const currentDateTime = new Date();

        const formatDateTime = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}${month}${day}${hours}${minutes}${seconds}`;
        };

        try {
            const response = await fetch('https://backend-m0xr.onrender.com/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_type: "billpayment",
                    order_id: formatDateTime(currentDateTime),
                    amount: 10000,
                    order_desc: "Payment for kangyoo-shoe",
                    bank_code: "NCB",
                    language: "vn"
                }),
                credentials: 'include'  
            });

            if (response.ok) {
                const vnpayPaymentUrl = await response.text();
                const cleanUrl = vnpayPaymentUrl.replace(/"/g, '').trim();
                window.location.href = cleanUrl;
            } else {
                console.error('Error in payment request');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [orderName, setOrderName] = useState('');

    const [orderEmail, setOrderEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);

    const [orderPhoneNumber, setOrderPhoneNumber] = useState('');
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);

    const [deliveryMethod, setDeliveryMethod] = useState('');

    const validateEmail = (email) => {
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/;
        return re.test(String(phoneNumber));
    };

    const { productsData, clearCart, calculateTotalAmount, totalAmount } = useContext(MyContextCart);
    const { userId } = useContext(MyContextUser);

    const handleOrder = async (event) => {
        event.preventDefault();
        if (!validateEmail(orderEmail) || !validatePhoneNumber(orderPhoneNumber)) {
            setEmailValid(false);
            setPhoneNumberValid(false);
            return;
        }
        const currentDateTime = new Date();
        const randomNum = Math.floor(Math.random() * (99 - 2 + 1)) + 2; 
        const order_id = `${currentDateTime.getDate()}${currentDateTime.getMinutes()}${randomNum}`;

        const year = currentDateTime.getFullYear();
        const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDateTime.getDate().toString().padStart(2, '0'); 
        const order_date = `${day}.${month}.${year}`; 
        
        try {
            const response = await fetch('https://backend-m0xr.onrender.com/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    order_id: order_id,
                    name: orderName,
                    email: orderEmail,
                    phone_number: orderPhoneNumber,
                    country: "VN",
                    city: cityName,
                    district: districName,
                    street: selectedStreet,
                    delivery_method: deliveryMethod,
                    status: "Not yet paid",
                    order_data: productsData,
                    total_amount: totalAmount,
                    date: order_date
                }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();

                if (data.message === 'Order added successfully') {
                    localStorage.setItem("order_id", order_id);
                    navigate(`/order_complete?total=${totalAmount}`);
                }
            } else {
                console.error('Error in order request');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        calculateTotalAmount();
    }, []);

    return (
        <div>
            <div className="text-teal-600">
                <img src={Brand} className="h-8 m-auto mt-5 mb-5 w-auto"></img>
            </div>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">

                <form onSubmit={handleOrder} action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden text-blue-500">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                CART
                            </span>
                        </li>


                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden text-blue-500">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                SHIPPING
                            </span>
                        </li>

                        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                PAYMENT
                            </span>
                        </li>

                        <li className="flex shrink-0 items-center">
                            <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            SUMMARY
                        </li>
                    </ol>

                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Details</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label for="your_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your name </label>
                                        <input value={orderName} onChange={(e) => setOrderName(e.target.value)} type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" />
                                    </div>

                                    <div>
                                        <label for="your_email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Your email* </label>
                                        <input value={orderEmail} onChange={(e) => setOrderEmail(e.target.value)} type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" />
                                        {!emailValid && <p className="mt-2 text-sm text-red-600">You need to have a valid email.</p>}
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label for="select-country-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Country* </label>
                                        </div>
                                        <select id="select-country-input-3" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                            <option selected>Vietnam</option>
                                        </select>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label for="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> City* </label>
                                        </div>
                                        <select
                                            onChange={handleChangeCity}
                                            value={selectedCity}
                                            id="select-city-input-3"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            required
                                        >
                                            <option>Choose city</option>
                                            {cityData.map((city, index) => (
                                                <option key={index} value={city.id}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label for="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> District* </label>
                                        </div>
                                        <select
                                            onChange={handleChangeDistric}
                                            value={selectedDistric}
                                            id="select-city-input-3"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        >
                                            <option>Choose district</option>
                                            {districtData.map((district, index) => (
                                                <option key={index} value={district.id}>{district.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label for="select-city-input-3" className="block text-sm font-medium text-gray-900 dark:text-white"> Street* </label>
                                        </div>
                                        <select
                                            onChange={handleChangeStreet}
                                            value={selectedStreet}
                                            id="select-city-input-3"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        >
                                            <option>Choose Street</option>
                                            {streetData.map((street, index) => (
                                                <option key={index}>{street.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label for="phone-input-3" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Phone Number* </label>
                                        <div className="flex flex-col items-start">
                                            <div className="flex items-center w-full">
                                                <button id="dropdown-phone-button-3" data-dropdown-toggle="dropdown-phone-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700" type="button">
                                                    <svg width="20px" height="20px" viewBox="0 0 36 36" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#DA251D" d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"></path>
                                                        <path fill="#FF0" d="M19.753 16.037L18 10.642l-1.753 5.395h-5.672l4.589 3.333l-1.753 5.395L18 21.431l4.589 3.334l-1.753-5.395l4.589-3.333z"></path></svg>
                                                    <p className='ml-2'>+84</p>
                                                </button>
                                                <div className="w-full">
                                                    <input value={orderPhoneNumber} onChange={(e) => setOrderPhoneNumber(e.target.value)} type="text" className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" />
                                                </div>
                                            </div>
                                            {!phoneNumberValid && <p className="mt-2 text-sm text-red-600">You need to have a valid phone number.</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Methods</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input value="fast" onChange={(e) => setDeliveryMethod(e.target.value)} aria-describedby="dhl-text" type="radio" name="delivery-method" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label for="dhl" className="font-medium leading-none text-gray-900 dark:text-white"> $15 - DHL Fast Delivery </label>
                                                <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Tommorow</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input value="free" onChange={(e) => setDeliveryMethod(e.target.value)} aria-describedby="fedex-text" type="radio" name="delivery-method" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label for="fedex" className="font-medium leading-none text-gray-900 dark:text-white"> Free Delivery - FedEx </label>
                                                <p id="fedex-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it by Friday, 13 Dec 2023</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input value="express" onChange={(e) => setDeliveryMethod(e.target.value)} aria-describedby="express-text" type="radio" name="delivery-method" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>

                                            <div className="ms-4 text-sm">
                                                <label for="express" className="font-medium leading-none text-gray-900 dark:text-white"> $49 - Express Delivery </label>
                                                <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get it today</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Enter a gift card, voucher or promotional code </label>
                                <div className="flex max-w-md items-center gap-4">
                                    <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                    <button type="button" className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply</button>
                                </div>
                                <button type="submit" className="mt-5 flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 
                                focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                            </div>
                        </div>

                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">${totalAmount}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Promo code</dt>
                                        <dd className="text-base font-medium text-green-500">0</dd>
                                    </dl>


                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">${totalAmount}</dd>
                                    </dl>
                                    <button onClick={handleOrder} type="submit" className="mt-5 flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 
                                focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">PLACE ORDER</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Checkout;
