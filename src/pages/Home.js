import React from 'react';
import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import Png from '../assets/images/home.avif';
import R1 from '../assets/images/home-decorate1.jpg';
import R2 from '../assets/images/home-decorate2.jpg';
import R3 from '../assets/images/home-decorate4.jpg';
import R4 from '../assets/images/home-decorate3.jpg';
import R5 from '../assets/images/home-decorate5.jpg';
import R6 from '../assets/images/home-decorate6.jpg';
import R7 from '../assets/images/home-decorate7.jpg';



function Home() {
    const imageStyle = {
        position: 'relative',
        zIndex: 1,
    };
    return (
        <div className="App">
            <Navbar />

            <div className="relative mt-32">
                <img src={Png} className="w-full" alt="Your Image" />
                <div className="absolute top-1/2 left-20 transform -translate-y-1/2 text-white px-4 py-2">
                    <p className="text-4xl font-bold">SPEED FOR RACE DAY</p>
                    <p className="text-lg font-bold">Pat tiernan - PUMA Marathoner - Second Fastest Australian Marathoner of All-Time</p>
                    <button className="mt-2 bg-white text-black px-10 py-3 rounded-md shadow-lg hover:bg-gray-200">
                        SHOP NOW
                    </button>
                </div>
            </div>

            <section class="space-y-4 md:space-y-0 px-20 relative top-3">
                <div class="relative flex flex-col md:grid md:grid-cols-8">
                    <div class="relative pt-8 flex-grow md:col-span-4">
                        <img src={R1} alt="R1" class="w-full h-auto object-cover md:max-h-full" />
                    </div>

                    <div class="relative flex flex-col items-center justify-center pb-2 p-4 md:pb-7 text-center text-puma-black md:col-span-4">
                        <p class="ml-4 font-sans">Innovative Nitrogen-infused foam technology that uses premium raw materials for maximal energy return.</p>
                    </div>
                </div>

                <div class="relative flex flex-col-reverse md:grid md:grid-cols-8">
                    <div class="relative flex flex-col items-center justify-center pb-2 p-4 md:pb-7 text-center text-puma-black md:col-span-4">
                        <p class="ml-4 font-sans text-lg">Carbon PWRPLATE for powerful propulsion and elite efficiency. Premium lightweight material engineered for breathability and reinforced with PWRTAPE.</p>
                    </div>
                    <div class="relative pt-0 pb-12 flex-grow md:col-span-4">
                        <img src={R2} alt="R2" class="w-full h-auto object-cover md:max-h-full" />
                    </div>
                </div>
            </section>

            <div className="relative">
                <img src={R3} className="w-full" alt="Your Image" />
                <div className="absolute top-1/2 right-12 transform -translate-y-1/2 text-white px-4 py-2">
                    <p className="text-4xl font-bold">FOREVER STYLISH</p>
                    <p className="text-lg font-bold">MAKE A TIMELESS STATEMENT</p>
                    <div className="flex space-x-4 mt-2">
                        <button className="bg-black text-white px-10 py-3 rounded-md shadow-lg">
                            MEN'S CLASSICS
                        </button>
                        <button className="bg-black text-white px-10 py-3 rounded-md shadow-lg ">
                            WOMEN'S CLASSICS
                        </button>
                    </div>
                </div>
            </div>

            <h4 class="text-3xl md:text-4xl font-bold font-display leading-tight text-center mt-20 mb-12">NEW SPORTS ARRIVALS</h4>

            <div className="relative">
                <img src={R4} className="w-full" alt="Your Image" />
                <div className="absolute top-1/2 left-20 transform -translate-y-1/2 text-white px-4 py-2">
                    <p className="text-4xl font-bold">EXPLORE WHAT’S NEW IN PERFORMANCE</p>
                    <p className="text-lg font-bold">BASKETBALL SPORTS</p>
                    <button className="mt-2 bg-white text-black px-10 py-3 rounded-md shadow-lg ">
                        SHOP NOW
                    </button>
                </div>
            </div>

            <section className="flex justify-center items-center space-x-4 my-8">
                <div className="relative w-2/5">
                    <img src={R5} className="w-full" alt="Your Image" />
                    <p className="absolute bottom-2 left-2 text-2xl text-white">SOCCER</p>
                </div>
                <div className="relative w-2/5">
                    <img src={R6} className="w-full" alt="Your Image" />
                    <p className="absolute bottom-2 left-2 text-2xl text-white">TRAINING</p>
                </div>
            </section>

            <h4 class="text-3xl md:text-4xl font-bold font-display leading-tight text-center mt-20 mb-12">CURRENT MUST-HAVES</h4>

            <div className="relative mb-12">
                <img src={R7} className="w-full" alt="Your Image" />
                <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-black px-4 py-2">
                    <p className="text-4xl font-bold mb-4">SUMMER SHOP</p>
                    <p className="text-lg font-bold mb-6">HOT SUMMER LOOKS</p>
                    <div className="flex space-x-4 mt-2">
                        <button className="bg-black text-white px-10 py-3 rounded-md shadow-lg">
                            MEN'S SHOP
                        </button>
                        <button className="bg-black text-white px-10 py-3 rounded-md shadow-lg">
                            WOMEN'S SHOP
                        </button>
                    </div>
                </div>
            </div>

            <ImageCarousel />

            <Footer />
        </div>
    );
}

export default Home;
