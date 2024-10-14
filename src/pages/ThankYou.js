import React from 'react';
import { useLocation } from 'react-router-dom';

const ThankYouPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const total_amount = queryParams.get('total');
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
            const response = await fetch('http://localhost:5000/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_type: "billpayment",
                    order_id: formatDateTime(currentDateTime),
                    amount: total_amount * 22000 ,
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
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <h1 className="text-2xl font-semibold text-gray-800">Thank You for Your Order!</h1>
                <p className="text-gray-600 mt-4">
                    We appreciate your business! Your order is being processed, and we will send you an email confirmation shortly.
                </p>
                <button
                    className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors duration-300"
                    onClick={handlePaymentVnpay}
                >
                    CONTINUE TO PAYMENT
                </button>
            </div>
        </div>
    );
};

export default ThankYouPage;
