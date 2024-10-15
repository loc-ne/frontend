import React, { useState, useEffect, useReducer } from 'react';
import { storage, ref, getDownloadURL } from '../firebase';
import { useParams } from 'react-router-dom';
import { Link, useNavigate} from 'react-router-dom';

import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import '../assets/css/Products.css';
import '../assets/css/ButtonFilter.css';
import Filter from '../components/Filter';
import LoadingSpinner from '../components/LoadingSpinner';


const Shoes = () => {
    const params = useParams();
    const { gender, request } = params;
    const [shoesData, setShoesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageURLs, setImageURLs] = useState([]);

    const [currentGender, setCurrentGender] = useState(gender);
    const [currentRequest, setCurrentRequest] = useState(request);

    useEffect(() => {
        if (gender) {
            setCurrentGender(gender);
        }
    }, [gender]);
    useEffect(() => {
        if (request) {
            setCurrentRequest(request);
        }
    }, [request])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!request) return;
                let response;
                if (request === 'all') {
                    response = await fetch(`https://backend-m0xr.onrender.com/products?fit=${gender}`);
                } else if (request === 'bestseller' || request === 'sale') {
                    response = await fetch(`https://backend-m0xr.onrender.com/products?fit=${gender}&tag=${request}`);
                } else if (request === 'sport') {
                    response = await fetch(`https://backend-m0xr.onrender.com/products?fit=${gender}&tag=${request}`);
                }
                else {
                    response = await fetch(`https://backend-m0xr.onrender.com/products?category=${request}&fit=${gender}`);
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setShoesData(data);
                const imagePromises = data.map(async (shoe) => {
                    const imageRef = ref(storage, shoe.thumbnail);
                    return await getDownloadURL(imageRef);
                });

                const urls = await Promise.all(imagePromises);
                setImageURLs(urls);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        setLoading(true);
    }, [request, gender]);



    const menu1 = ["Classic", "Lifestyle", "Suede", "Palermo"];
    const menu2 = ["Running", "Training", "Soccer", "Motorsport", "Racquet", "Basketball", "Golf", "Yoga"];
    const menu3 = ["$50 - $75", "$75 - $100", "$100 - $150", "$150 - $200"];
    const menu4 = ["Best Seller", "Price Low To High", "Price High To Low"];

    const initialState = {
        categories: '',
        sports: '',
        priceRange: '',
        sortBy: '',
    };

    function filterReducer(state, action) {
        switch (action.type) {
            case 'SET_CATEGORY':
                return { ...state, sports: '', categories: action.payload };
            case 'SET_SPORTS':
                return { ...state, categories: '', sports: action.payload };
            case 'SET_PRICE_RANGE':
                return { ...state, priceRange: action.payload };
            case 'SET_SORT_BY':
                return { ...state, sortBy: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(filterReducer, initialState);
    const [isChangeFilter, setIsChangeFilter] = useState(false);
    const navigate = useNavigate();

    const handleFilterChange = (filterType, filterValue) => {
        switch (filterType) {
            case 'Categories':
                dispatch({ type: 'SET_CATEGORY', payload: filterValue });
                setIsChangeFilter(true);
                break;
            case 'Sports':
                dispatch({ type: 'SET_SPORTS', payload: filterValue });
                setIsChangeFilter(true);
                break;
            case 'Price':
                dispatch({ type: 'SET_PRICE_RANGE', payload: filterValue });
                setIsChangeFilter(true);
                break;
            case 'Sort by':
                dispatch({ type: 'SET_SORT_BY', payload: filterValue });
                setIsChangeFilter(true);
                break;
            default:
                break;
        }
    };
    const handleDeleteFilter = (filter) => {
        if (menu1.includes(filter)) {
            dispatch({ type: 'SET_CATEGORY', payload: '' });
            setIsChangeFilter(true);
        }
        else if (menu2.includes(filter)) {
            dispatch({ type: 'SET_SPORTS', payload: '' });
            setIsChangeFilter(true);
        }
        else if (menu3.includes(filter)) {
            dispatch({ type: 'SET_PRICE_RANGE', payload: '' });
            setIsChangeFilter(true);
        }
        else if (menu4.includes(filter)) {
            dispatch({ type: 'SET_SORT_BY', payload: '' });
            setIsChangeFilter(true);
        }
        else {
            dispatch({ type: 'SET_CATEGORY', payload: '' });
            dispatch({ type: 'SET_SPORTS', payload: '' });
            dispatch({ type: 'SET_PRICE_RANGE', payload: '' });
            dispatch({ type: 'SET_SORT_BY', payload: '' });
            setIsChangeFilter(true);
        }
    }

    useEffect(() => {
        if (isChangeFilter) {
            const params = new URLSearchParams();
            if (state.categories !== '') {
                const normalizedCategory = state.categories.toLowerCase().split(' ').join('-');
                params.append('category', normalizedCategory);
            }
            if (state.sports !== '') {
                const normalizedSport = state.sports.toLowerCase().split(' ').join('-');
                params.append('sport', normalizedSport);
            }
            if (state.priceRange !== '') {
                params.append('price_range', state.priceRange);
            }
            if (state.sortBy !== '') {
                params.append('sort', state.sortBy);
            }
            navigate(`/shoes/${currentGender}/${currentRequest}?${params.toString()}`);
            setIsChangeFilter(false);
        }
    }, [isChangeFilter, state, navigate]);

    useEffect(() => {
        dispatch({ type: 'SET_CATEGORY', payload: '' });
        dispatch({ type: 'SET_SPORTS', payload: '' });
        dispatch({ type: 'SET_PRICE_RANGE', payload: '' });
        dispatch({ type: 'SET_SORT_BY', payload: '' });
    }, [request, gender])

    const queryString = window.location.search;
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response
                if (request === 'all' && queryString === '') {
                    response = await fetch(`https://backend-m0xr.onrender.com/products?fit=${gender}`);
                } else if (request === 'bestseller' || request === 'sale') {
                    response = await fetch(`https://backend-m0xr.onrender.com/products?fit=${gender}&tag=${request}`);
                } else if (request === 'sport') {
                    response = await fetch(`https://backend-m0xr.onrender.com/products?fit=${gender}&tag=${request}`);
                }
                else if (request !== 'all') {
                    response = await fetch(`https://backend-m0xr.onrender.com/products?category=${request}&fit=${gender}`);
                }
                else {
                    response = await fetch(`https://backend-m0xr.onrender.com/filter${queryString}`);
                }
                const data = await response.json();
                setShoesData(data);
                const imagePromises = data.map(async (shoe) => {
                    const imageRef = ref(storage, shoe.thumbnail);
                    return await getDownloadURL(imageRef);
                });

                const urls = await Promise.all(imagePromises);
                setImageURLs(urls);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        setLoading(true);
    }, [queryString]);


    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const description = `
        Designed for style, engineered for performance and built for your active lifestyle, PUMA's collection of men's sneakers are ready to take you through your day. 
        Whether you need a pair of training shoes for the gym or you need an everyday shoe to elevate your outfit, PUMA's sneakers for men offer comfort and versatility for every occasion. 
        Explore running shoes for men with the latest cutting-edge PUMA performance tech. Shock-absorbent and highly-cushioned midsoles deliver optimal support while
        durable outsoles provide maximum traction and superior grip, with breathable, retro-inspired uppers for unbeatable comfort. Old school track and court shoes are reimagined for modern streetwear in PUMA's collection of lifestyle shoes. 
        Take a deep dive into PUMA's legendary sports heritage with classic shoes like Suede and Roma. Whatever the occasion, rock a pair of PUMA kicks for unparalleled performance and style.
    `;

    const handleOnClick = (e, id, name) => {
        e.preventDefault();
        navigate(`/product/${id}/${name.toLowerCase()}`);
      };

    return (
        <div>
            <Navbar />

            <ul className="breadcrumb flex space-x-2 text-black mt-40 mb-4 ml-32">
                <li className="flex items-center font-bold">
                    <a href="#">Home</a>
                    <span className="mx-2">•</span>
                </li>
                <li className="flex items-center font-bold">
                    <a href="#">{currentGender.charAt(0).toUpperCase() + currentGender.slice(1)}</a>
                    <span className="mx-2">•</span>
                </li>
                <li className="flex items-center">
                    <a className={request !== 'all' ? 'font-bold' : ''} href="#">{currentGender.charAt(0).toUpperCase() + currentGender.slice(1)}'s Shoes And Sneakers</a>
                    <span className="mx-2">•</span>
                    {request !== 'all' && <a href="#">{currentRequest.charAt(0).toUpperCase() + currentRequest.slice(1)}</a>}
                </li>
            </ul>

            <h4 class="text-3xl md:text-4xl font-bold font-display leading-tight ml-32 mb-8">{currentGender.toUpperCase()}'S SHOES AND SNEAKERS</h4>

            <div className="text-gray-700 text-left ml-32 mr-96 ">
                <p className="text-lg">
                    {isExpanded ? description : `${description.substring(0, 243)}...`}
                </p>
                <button
                    className="mt-2 hover:underline focus:outline-none text-black"
                    onClick={handleToggle}
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            </div>
            {currentRequest === 'all' &&
                <div className="flex space-x-4 gap-12 mb-8">
                    <Filter nameDropdown={'Categories'} menuItems={menu1} onFilterChange={handleFilterChange} />
                    <Filter nameDropdown={'Sports'} menuItems={menu2} onFilterChange={handleFilterChange} />
                    <Filter nameDropdown={'Price'} menuItems={menu3} onFilterChange={handleFilterChange} />
                    <Filter nameDropdown={'Sort by'} menuItems={menu4} onFilterChange={handleFilterChange} />
                </div>}

            <div class="grid min-h-[140px] w-full overflow-x-scroll rounded-lg p-6 lg:overflow-visible ml-24 gap-x-24">
                <div class="flex divide-x divide-gray-800 row">
                    {Object.keys(initialState).map((key) => (
                        state[key] !== '' && (
                            <button className="button mr-10" onClick={() => handleDeleteFilter(state[key])}>
                                <span className="button__text">{state[key]}</span>
                                <span className="button__icon"><svg className="svg" height="48" viewBox="0 0 1024 1024" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" fill="" /><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" fill="" /><path d="M328 340.8l32-31.2 348 348-32 32z" fill="" /></svg></span>
                            </button>
                        )
                    ))}
                    {Object.values(state).some(value => value !== '') && <button className="button mr-10" onClick={() => handleDeleteFilter('Clear')}>
                        <span className="button__text">CLEAR ALL</span>
                        <span className="button__icon"><svg className="svg" height="48" viewBox="0 0 1024 1024" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" fill="" /><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" fill="" /><path d="M328 340.8l32-31.2 348 348-32 32z" fill="" /></svg></span>
                    </button>}
                </div>
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white">
                    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-28 lg:max-w-screen-2xl lg:px-10">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{shoesData.length} Products</h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {shoesData.map((shoe, index) => (
                                <div key={index} className="group relative">
                                    <div className="aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-96">
                                        <Link onClick={(e) => handleOnClick(e, shoe.id, shoe.name)} to="#"><img
                                            src={imageURLs[index]}
                                            alt={shoe.name}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        /></Link>
                                    </div>

                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <Link onClick={(e) => handleOnClick(e, shoe.id, shoe.name)} to="#">{shoe.name}</Link>
                                            </h3>
                                        </div>
                                        <Link onClick={(e) => handleOnClick(e, shoe.id, shoe.name)} to="#"><p className="text-sm font-medium text-gray-900">${shoe.price}</p></Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Footer />

        </div>
    );
}

export default Shoes;
