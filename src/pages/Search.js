import React, { useState, useEffect } from 'react';
import { storage, ref, getDownloadURL } from '../firebase';
import { useParams } from 'react-router-dom';
import { Link, useNavigate} from 'react-router-dom';

import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import '../assets/css/Products.css';
import '../assets/css/ButtonFilter.css';
import LoadingSpinner from '../components/LoadingSpinner';


const Search = () => {
    const params = useParams();
    const [shoesData, setShoesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageURLs, setImageURLs] = useState([]);

    const navigate = useNavigate();


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const kValue = urlParams.get('k');

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`https://backend-m0xr.onrender.com/search${queryString}`);

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



    const handleOnClick = (e, id, name) => {
        e.preventDefault();
        navigate(`/product/${id}/${name.toLowerCase()}`);
    };

    return (
        <div>
            <Navbar />

            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white mt-10">
                    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-28 lg:max-w-screen-2xl lg:px-10">
                        {shoesData.length > 0 ? (
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                {shoesData.length} RESULT{shoesData.length > 1 ? 'S' : ''} FOR "{kValue}"
                            </h2>
                        ) : (
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
                                Sorry, we couldn't find what you are looking for
                            </h2>
                        )}
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

export default Search;
