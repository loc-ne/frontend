import React, { useContext, useState, useEffect } from 'react';
import { storage, ref, getDownloadURL } from '../firebase';
import MyContextCart from '../MyContextCart';
import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import ModalCheckout from '../components/ModalCheckout';
import MyContextUser from '../MyContextUser';
import { Link, useNavigate} from 'react-router-dom';
import PromoSection from '../components/PromoSection';

const Cart = () => {
    const { isLoggedIn} = useContext(MyContextUser);

    const { productsData, removeProduct, decreaseQuantity, increaseQuantity } = useContext(MyContextCart);

    const [imageURLs, setImageURLs] = useState([]);

    useEffect(() => {
        const fetchImageURLs = async () => {
            const imagePromises = productsData.map(async (product) => {
                const imageRef = ref(storage, product.product_thumbnail);
                return await getDownloadURL(imageRef);
            });
            const urls = await Promise.all(imagePromises);
            setImageURLs(urls);
        };

        fetchImageURLs();
    }, [productsData]);

    const [totalAmount, setTotalAmount] = useState(0.0);
    const [totalProduct, setTotalProduct] = useState(0);
    
    useEffect(() => {
        let calculatedTotalAmount = 0;
        let calculatedTotalProduct = 0;

        productsData.forEach((item) => {
            calculatedTotalAmount += item.product_quantity * item.product_price;
            calculatedTotalProduct += item.product_quantity;
        });

        setTotalAmount(calculatedTotalAmount);
        setTotalProduct(calculatedTotalProduct);
    }, [productsData]);

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    const handleDelete = (product) => {
        removeProduct(product);
        closeModal();
    };

    const handleDecreaseQuantity = (product) => {
        decreaseQuantity(product);
    }
    const handleIncreaseQuantity = (product) => {
        increaseQuantity(product);
    }

    const [isOpenModalCheckout, setIsOpenModalCheckout] = useState(false);
    const navigate = useNavigate();
    const handleCheckout = () => {
        if (!isLoggedIn) {
            setIsOpenModalCheckout(true);
        }
        else {
            navigate('/checkout');
        }
    }

    return (
        <div>
            <Navbar />
            {isLoggedIn && productsData.length === 0 ? (
                <>
                    <div className="mt-10 flex flex-col justify-center items-center h-screen bg-gray-100 space-y-4">
                        <p className="text-center text-2xl font-bold text-indigo-600">
                            Your Shopping Cart is Empty
                        </p>
                        <PromoSection />
                    </div>
                </>
            ) : !isLoggedIn && productsData.length === 0 ? (
                <>
                    <div className="mt-10 flex flex-col justify-center items-center h-screen bg-gray-100 space-y-4">
                        <p className="text-center text-2xl font-bold text-gray-900">
                            Your Shopping Cart is Empty, Please
                            <Link to="/account?login=true" className="text-black-100 underline decoration-black-500 hover:text-gray-700 font-semibold mx-1">
                                Sign in
                            </Link>
                            to view your saved Cart
                        </p>
                        <PromoSection />
                    </div>

                </>
            ) : (
                <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-32">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">MY SHOPPING CART ({totalProduct} Products)</h2>

                        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                <div className="space-y-6">
                                    {productsData.map((shoe, index) =>
                                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <a href="#" class="shrink-0 md:order-1">
                                                    <img className=" w-full md:max-w-[300px] dark:hidden" src={imageURLs[index]} alt="imac image" />
                                                    <img className="hidden h-20 w-20 dark:block" src={imageURLs[index]} alt="imac image" />
                                                </a>

                                                <label for="counter-input" className="sr-only">Choose quantity:</label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center">
                                                        <button onClick={() => handleDecreaseQuantity(shoe)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                            <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">{shoe.product_quantity} </p>
                                                        <button onClick={() => handleIncreaseQuantity(shoe)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                            <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">${shoe.product_price * shoe.product_quantity}</p>
                                                    </div>
                                                </div>

                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <a href="#" className="text-base text-gray-900  dark:text-white font-semibold ">{shoe.product_name}</a>
                                                    <p className="text-base font-medium text-gray-900  dark:text-white">Price: {shoe.product_price}</p>
                                                    <p className="text-base font-medium text-gray-900  dark:text-white">Size: {shoe.size}</p>

                                                    <div className="flex items-center gap-4">
                                                        <button onClick={openModal} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                            <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                            </svg>
                                                            Remove
                                                        </button>

                                                        {isOpen && (
                                                            <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
                                                                <div className="relative p-4 w-full max-w-3xl mx-auto my-10">

                                                                    <div className="relative p-4 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800 sm:p-5">
                                                                        <div className="flex justify-end">
                                                                            <p className="text-gray-500 dark:text-gray-300 mr-28 text-2xl">Are you sure you want to remove this item?</p>
                                                                            <button
                                                                                onClick={closeModal}
                                                                                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                                            >
                                                                                <svg
                                                                                    className="w-5 h-5"
                                                                                    fill="currentColor"
                                                                                    viewBox="0 0 20 20"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                >
                                                                                    <path
                                                                                        fillRule="evenodd"
                                                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                                        clipRule="evenodd"
                                                                                    />
                                                                                </svg>
                                                                                <span className="sr-only">Close modal</span>
                                                                            </button>
                                                                        </div>
                                                                        <div className="flex items-center justify-center">
                                                                            <a
                                                                                className="relative flex-shrink-0 w-64 h-64 mx-3 mt-3 overflow-hidden rounded-xl"
                                                                                href="#"
                                                                            >
                                                                                <img
                                                                                    className="object-cover w-full h-full"
                                                                                    src={imageURLs[index]}
                                                                                    alt="product image"
                                                                                />

                                                                            </a>
                                                                        </div>
                                                                        <div className="ml-4 text-left">
                                                                            <a href="#">
                                                                                <h5 className="text-xl tracking-tight text-slate-900 text-center">
                                                                                    {shoe.product_name}
                                                                                </h5>
                                                                            </a>
                                                                            <p className="text-3xl font-bold text-slate-900 text-center">${shoe.product_price}</p>
                                                                            <div className="flex items-center space-x-2 mt-2">

                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-4 px-5 pb-5">
                                                                            <div className="flex justify-center space-x-4">
                                                                                <button
                                                                                    onClick={closeModal}
                                                                                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                                                >
                                                                                    CANCEL
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleDelete(shoe)}
                                                                                    className="py-2 px-3 text-sm font-medium text-center text-white bg-black rounded-lg  focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                                                >
                                                                                    REMOVE
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        )}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}

                                </div>
                            </div>

                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>


                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original Price</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">${totalAmount}</dd>
                                            </dl>
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Promo Code</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">$0.0</dd>
                                            </dl>

                                        </div>

                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                            <dd className="text-base font-bold text-gray-900 dark:text-white">${totalAmount}</dd>
                                        </dl>
                                    </div>

                                    <button onClick={handleCheckout} className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</button>
                                    {isOpenModalCheckout && (
                                        <ModalCheckout
                                            onClose={() => setIsOpenModalCheckout(false)}
                                        />
                                    )}
                                </div>

                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                    <form className="space-y-4">
                                        <div>
                                            <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                                            <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                        </div>
                                        <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                                    </form>
                                    <div className="font-sans w-80 p-3 flex flex-row items-center justify-start bg-white rounded-lg shadow-sm mt-4">
                                        <div className="w-5 h-5 transform -translate-y-1 mr-2">
                                            <svg fill="green" height="24" width="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M 0 6 L 0 8 L 19 8 L
19 23 L 12.84375 23 C 12.398438 21.28125 10.851563 20 9 20 C 7.148438 20 5.601563 21.28125 5.15625 23 L 4 23 L 4 18 L 2 18 L 2 25 L 5.15625 25 C 5.601563 26.71875 7.148438 28 9 28 C 10.851563 28 12.398438 26.71875 12.84375 25 L 21.15625 25 C 21.601563 26.71875 23.148438 28 25 28 C 26.851563 28 28.398438 26.71875 28.84375 25 L 32 25 L 32 16.84375 L 31.9375 16.6875 L 29.9375 10.6875 L 29.71875 10 L 21 10 L 21 6 Z M 1 10 L 1 12 L 10 12 L 10 10 Z M 21 12 L 28.28125 12 L 30 17.125 L 30 23 L 28.84375 23 C 28.398438 21.28125 26.851563 20 25 20 C 23.148438 20 21.601563 21.28125 21.15625 23 L 21 23 Z M 2 14 L 2 16 L 8 16 L 8 14 Z M 9 22 C 10.117188 22 11 22.882813 11 24 C 11 25.117188 10.117188 26 9 26 C 7.882813 26 7 25.117188 7 24 C 7 22.882813 7.882813 22 9 22 Z M 25 22 C 26.117188 22 27 22.882813 27 24 C 27 25.117188 26.117188 26 25 26 C 23.882813 26 
23 25.117188 23 24 C 23 22.882813 23.882813 22 25 22 Z"/></svg>
                                        </div>
                                        <div className="font-medium text-lg text-green-800">YOU’VE EARNED FREE SHIPPING</div>
                                    </div>

                                    <div className="font-sans w-max mb-8 p-3 flex flex-row items-center justify-start bg-white rounded-lg shadow-sm mt-4">
                                        <div className="w-5 h-5 transform -translate-y-1 mr-2">

                                            <svg fill="black" height="24" width="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >

                                                <path d="M0 0h48v48H0z" fill="none" />
                                                <g id="Shopicon">
                                                    <path d="M10,22v2c0,7.72,6.28,14,14,14s14-6.28,14-14s-6.28-14-14-14h-4V4l-8,8l8,8v-6h4c5.514,0,10,4.486,10,10s-4.486,10-10,10
		s-10-4.486-10-10v-2H10z"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="font-medium text-lg text-black">FREE RETURNS ON ALL QUALIFYING ORDERS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <Footer />
        </div>
    );
};

export default Cart;
