import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { storage, ref, getDownloadURL } from '../firebase';
import LoadingSpinner from '../components/LoadingSpinner';


const OrderSumary = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const order_id = localStorage.getItem("order_id");
    const [orderData, setOrderData] = useState([]);
    const [imageURLs, setImageURLs] = useState('');

    useEffect(() => {
        const sendTransactionData = async () => {
            const responseCode = queryParams.get('vnp_ResponseCode');
            const secureHash = queryParams.get('vnp_SecureHash');
            const bankCode = queryParams.get('vnp_BankCode');
            const amount = queryParams.get('vnp_Amount');
            const orderInfo = queryParams.get('vnp_OrderInfo');
            const transactionNo = queryParams.get('vnp_TransactionNo');
            const TransactionStatus = queryParams.get('vnp_TransactionStatus');
            const txnRef = queryParams.get('vnp_TxnRef');
            const tmnCode = queryParams.get('vnp_TmnCode');
            const bankTranNo = queryParams.get('vnp_BankTranNo');
            const cardType = queryParams.get('vnp_CardType');
            const payDate = queryParams.get('vnp_PayDate');
            const secureHashType = queryParams.get('vnp_SecureHashType');

            try {
                const response = await fetch(`http://localhost:5000/payment_ipn?vnp_ResponseCode=${responseCode}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        vnp_ResponseCode: responseCode,
                        vnp_SecureHash: secureHash,
                        vnp_BankCode: bankCode,
                        vnp_Amount: amount,
                        vnp_OrderInfo: orderInfo,
                        vnp_TransactionNo: transactionNo,
                        vnp_TransactionStatus: TransactionStatus,
                        vnp_TxnRef: txnRef,
                        vnp_TmnCode: tmnCode,
                        vnp_BankTranNo: bankTranNo,
                        vnp_PayDate: payDate,
                        vnp_CardType: cardType,
                        vnp_SecureHashType: secureHashType
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.Message == 'Order payment success') {
                        const updateResponse = await fetch(`http://localhost:5000/update_order?order_id=${order_id}`)
                        const data = await updateResponse.json();
                        setOrderData(data.updated_orders);

                        const imagePromise = async () => {
                            const urls = await Promise.all(data.updated_orders.map(async (item) => {
                                const imageRef = ref(storage, item.product_thumbnail);
                                return await getDownloadURL(imageRef);
                            }));
                            return urls;
                        };

                        const urls = await imagePromise();
                        setImageURLs(urls);

                    }
                } else {
                    console.error('Error processing transaction');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        sendTransactionData();
    }, []);

    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;

    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    let deliveryTime;
    if (orderData.delivery_method === 'fast') {
        deliveryTime = addDays(currentDate, 2);
    } else if (orderData.delivery_method === 'free') {
        deliveryTime = addDays(currentDate, 7);
    } else {
        deliveryTime = addDays(currentDate, 1);
    }

    const deliveryDay = deliveryTime.getDate();
    const deliveryMonth = deliveryTime.toLocaleString('default', { month: 'long' });
    const deliveryYear = deliveryTime.getFullYear();
    const formattedDeliveryDate = `${deliveryDay}${getOrdinalSuffix(deliveryDay)} ${deliveryMonth} ${deliveryYear}`;

    return (
        <div>
            {
                orderData.length > 0 ? (
                    <section class="py-24 relative">
                        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                            <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center">
                                Payment Successful
                            </h2>
                            <p class="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
                                you can
                                check our order summary frm below</p>
                            <ol className="mb-5 items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
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
                                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden text-blue-500">
                                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        PAYMENT
                                    </span>
                                </li>

                                <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden text-blue-500">
                                        <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        SUMMARY
                                    </span>
                                </li>
                            </ol>

                            <div class="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                                <div
                                    class="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                                    <div class="data">
                                        <p class="font-semibold text-base leading-7 text-black">Order Id: <span class="text-indigo-600 font-medium">#{order_id}</span></p>
                                        <p class="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span class="text-gray-400 font-medium">
                                            {formattedDate}  </span></p>
                                    </div>
                                    <Link to="/order_overview"><button
                                        class="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">Track
                                        Your Order</button></Link>
                                </div>
                                <div class="w-full px-3 min-[400px]:px-6">

                                    <div class="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                                        <div class="img-box max-lg:w-full">
                                            <img src={imageURLs} alt="Diamond Watch image"
                                                class="aspect-square w-full lg:max-w-[140px] rounded-xl" />
                                        </div>
                                        <div class="flex flex-row items-center w-full ">
                                            <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                                                <div class="flex items-center">
                                                    <div class="">
                                                        <h2 class="font-semibold text-xl leading-8 text-black mb-3 ">
                                                            {orderData[0].product_name}</h2>
                                                        <div class="flex items-center  ">
                                                            <p
                                                                class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                                Size: <span class="text-gray-500">{orderData[0].product_size}</span></p>
                                                            <p class="font-medium text-base leading-7 text-black ">Qty: <span
                                                                class="text-gray-500">{orderData[0].product_quantity}</span></p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="grid grid-cols-5">
                                                    <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                        <div class="flex gap-3 lg:block">
                                                            <p class="font-medium text-lg leading-7 text-black">price</p>
                                                            <p class="lg:mt-4 font-medium text-lg leading-7 text-indigo-600">${orderData[0].product_price}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                        <div class="flex gap-3 lg:block">
                                                            <p class="font-medium text-lg leading-7 text-black">Status
                                                            </p>
                                                            <p
                                                                class="font-medium text-lg leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                                                                {orderData[0].status}</p>
                                                        </div>

                                                    </div>
                                                    <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                                        <div class="flex gap-3 lg:block">
                                                            <p class="font-medium text-lg whitespace-nowrap leading-6 text-black">
                                                                Expected Delivery Time</p>
                                                            <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                                                {formattedDeliveryDate}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                                <div class="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                                    <p class="font-semibold text-lg text-black py-6">Total Price: <span class="text-indigo-600"> ${orderData[0].total_amount}</span></p>
                                </div>

                            </div>
                        </div>
                    </section>
                ) : (
                    <LoadingSpinner />
                )
            }

        </div>
    );
}

export default OrderSumary;
