import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import '../assets/css/Products.css';
import { useParams, } from 'react-router-dom';
import { storage, ref, getDownloadURL } from '../firebase';
import MyContextCart from '../MyContextCart';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';


const Products = () => {

    const { id } = useParams();
    const [shoeDetailData, setShoeDetailData] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [thumbnail, setThumbnail] = useState('');


    const fetchData = async (id) => {
        try {
            const response = await fetch(`https://backend-m0xr.onrender.com/product_detail?id=${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setShoeDetailData(data);
            sessionStorage.setItem(`shoeDetailData_${id}`, JSON.stringify(data));

            const imagePromises = data.images.map(async (image_url) => {
                const imageRef = ref(storage, image_url);
                return await getDownloadURL(imageRef);
            });
            const urls = await Promise.all(imagePromises);
            setImageURLs(urls);
            sessionStorage.setItem(`imageURLs_${id}`, JSON.stringify(urls));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedShoeDetailData = sessionStorage.getItem(`shoeDetailData_${id}`);
        const savedImageURLs = sessionStorage.getItem(`imageURLs_${id}`);

        if (savedShoeDetailData && savedImageURLs) {
            setShoeDetailData(JSON.parse(savedShoeDetailData));
            setImageURLs(JSON.parse(savedImageURLs));
            setLoading(false);
        } else {
            if (id) {
                fetchData(id);
            }
        }
    }, [id]);

    useEffect(() => {
        const fetchThumbnail = async () => {
            const img = ref(storage, shoeDetailData.thumbnail);
            const urlImage = await getDownloadURL(img);
            setThumbnail(urlImage);
            sessionStorage.setItem(`thumbnail_${id}`, urlImage);
        };

        if (shoeDetailData?.thumbnail) {
            fetchThumbnail();
        } else {
            const savedThumbnail = sessionStorage.getItem(`thumbnail_${id}`);
            if (savedThumbnail) {
                setThumbnail(savedThumbnail);
            }
        }
    }, [shoeDetailData?.thumbnail, id]);




    const firstColumnImages = imageURLs.slice(0, 3);
    const secondColumnImages = imageURLs.slice(3, 6);
    const { productsData, setProductsData, totalAmount, setTotalAmount, addToCart } = useContext(MyContextCart);
    const size_product = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];
    const quantity_product = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const [selected, setSelected] = useState();
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleSelectSize = (index, size) => () => {
        setSelected(index);
        setSize(size);
    };
    const handleSelectQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const [isAddTocart, setIsAddToCart] = useState(false);
    const onClose = () => {
        setIsAddToCart(false);
    }

    const handleAddToCart = () => {
        if (size === 0) {
            setSelected(-1);
        }
        if (size !== 0) {
            const product = {
                product_id: id,
                product_name: shoeDetailData.name,
                product_thumbnail: shoeDetailData.thumbnail,
                product_price: shoeDetailData.price,
                product_quantity: quantity,
                size: size
            };
            addToCart(product);
            setIsAddToCart(true);
        }

    }

    return (
        <div>
            <Navbar />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <section className="grid grid-cols-3 ml-24 mt-40 mb-12 mr-44">

                        <div className="flex flex-col gap-3">
                            {firstColumnImages.map((url, index) => (
                                <img key={index} className="max-w-lg" src={url} alt={`Shoe ${index + 1}`} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            {secondColumnImages.map((url, index) => (
                                <img key={index} className="max-w-lg" src={url} alt={`Shoe ${index + 4}`} />
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">

                            <h3 className="text-4xl text-gray-900 font-bold mb-2">{shoeDetailData.name}</h3>
                            <p className="text-2xl text-gray-700 font-semibold mb-4">${shoeDetailData.price}</p>

                            <div className="border-b border-gray-300 mb-4"></div>


                            <div className="grid grid-cols-4 gap-2">
                                {size_product.map((size, index) =>
                                    <button
                                        key={index}
                                        onClick={handleSelectSize(index, size)}
                                        className={`py-2 px-4 rounded border font-bold ${selected === index ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-black border-gray-300'}`}
                                    >
                                        Size {size}
                                    </button>)}
                            </div>
                            {selected === -1 &&
                                <div className="font-sans w-80 p-3 flex flex-row items-center justify-start bg-orange-100 rounded-lg shadow-sm mt-4">
                                    <div className="w-5 h-5 transform -translate-y-1 mr-2">
                                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#EF665B"></path>
                                        </svg>
                                    </div>
                                    <div className="font-medium text-lg text-red-800">Please select a size</div>
                                </div>}

                            <div className="flex items-center">
                                <select
                                    value={quantity}
                                    onChange={handleSelectQuantity}
                                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Quantity" disabled>Quantity</option>
                                    {quantity_product.map((quantity, index) => (
                                        <option key={index} value={quantity}>{quantity}</option>
                                    ))}
                                </select>


                                <button onClick={handleAddToCart} className="rainbow-hover mb-6 ml-2">
                                    <span className="sp">ADD TO CART</span>
                                </button>
                                {isAddTocart &&
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                        <div className="absolute inset-0 bg-black opacity-50"></div>
                                        <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                                            <div className="flex justify-between items-start">
                                                <h2 className="text-xl font-semibold">Added to cart</h2>
                                                <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><svg width="40px" height="40px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000">
                                                    <line x1="20" y1="20" x2="44" y2="44" /><line x1="44" y1="20" x2="20" y2="44" />
                                                    <rect x="8" y="8" width="48" height="48" /></svg></button>
                                            </div>
                                            <div className="flex items-center mt-4">
                                                <img src={thumbnail} alt={shoeDetailData.name} className="w-24 h-24 object-cover rounded" />
                                                <div className="ml-4">
                                                    <h3 className="text-lg font-medium">{shoeDetailData.name}</h3>
                                                    <p className="text-gray-500">Size: {size}</p>
                                                    <p className="text-lg font-semibold">${shoeDetailData.price}</p>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-gray-500">39+ people have this item in their cart</p>
                                            <div className="mt-4">
                                                <Link to="/cart"><button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                                                    VIEW CART ({productsData.length}) & CHECKOUT
                                                </button></Link>
                                            </div>
                                            <p className="mt-4 text-xs text-gray-500 text-center">
                                                By continuing, I confirm that I have read and accept the
                                                <a href="#" className="underline"> Terms and Conditions</a> and the
                                                <a href="#" className="underline"> Privacy Policy</a>.
                                            </p>
                                        </div>
                                    </div>}

                            </div>

                            <div className="border-b border-gray-300 mb-4"></div>
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



                    </section>

                    <div className="max-w-6xl mx-auto px-6 mb-10">
                        <div className="grid grid-cols-2 ">
                            <div className="bg-white p-8 ">
                                <h1 className="text-3xl font-bold mb-6">Details</h1>
                                <ul className="list-disc list-inside text-lg text-gray-800">
                                    <li>Low boot</li>
                                    <li>PUMA branding details</li>
                                    <li>Lace closure</li>
                                    <li>Mesh lining</li>
                                    <li>Synthetic leather base and overlays</li>
                                </ul>
                            </div>
                            <div className="bg-white p-8  ">
                                <h1 className="text-3xl font-bold mb-6">Material Information</h1>
                                <ul className="list-disc list-inside text-lg text-gray-800">
                                    <li>Midsole: 100% Synthetic</li>
                                    <li>Sockliner: 100% Textile</li>
                                    <li>Outsole: 100% Rubber</li>
                                    <li>Upper: 69.17% Leather - cow, 30.83% Synthetic</li>
                                    <li>Lining: 100% Textile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Products;
