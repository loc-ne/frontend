import React, { useState } from 'react';
import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import m2 from '../assets/images/women-decorate1.jpg';
import m3 from '../assets/images/women-decorate2.jpg';
import basketball from '../assets/images/women-decorate3.jpg';
import soccer from '../assets/images/women-decorate4.jpg';
import motor from '../assets/images/women-decorate5.jpg';
import running from '../assets/images/women-decorate6.jpg';


function Women() {
    return (
        <div>
            <Navbar />

            <div className="relative mt-32">
                <img src={m2} className="w-full" alt="Your Image" />
                <div className="absolute top-1/2 right-12 transform -translate-y-1/2 text-white px-4 py-2">
                    <p className="text-4xl text-black  font-black">BUILD YOUR WARDROBE</p>
                    <p className="text-lg text-black font-black">THE LASTEST AND GREATEST</p>
                    <div className="flex space-x-4 mt-2">
                        <button className="bg-black text-white px-10 py-3 rounded-md shadow-lg">
                            SHOP NEW CALENDAR
                        </button>
                        <button className="bg-black text-white px-10 py-3 rounded-md shadow-lg ">
                            SHOP BESTSELLER
                        </button>
                    </div>
                </div>
            </div>

            <h4 class="text-3xl md:text-4xl font-bold font-display leading-tight text-center mt-20 mb-12">SHOP BY PERFORMANCE</h4>

            <div className="flex flex-wrap justify-center gap-5">
                <img src={motor} alt="Motor Shoe" className="w-full sm:max-w-[400px] h-auto" />
                <img src={running} alt="Running Shoe" className="w-full sm:max-w-[400px] h-auto" />
                <img src={basketball} alt="Gym Shoe" className="w-full sm:max-w-[400px] h-auto" />
                <img src={soccer} alt="Golf Shoe" className="w-full sm:max-w-[400px] h-auto" />
            </div>

            <div className="relative mt-16 m-28">
                <img src={m3} className="w-full" alt="Your Image" />
                <div className="absolute top-1/2 left-20 transform -translate-y-1/2 text-white px-4 py-2">
                    <p className="text-4xl font-bold">SPEED FOR RACE DAY</p>
                    <p className="text-lg font-bold">Pat tiernan - PUMA Marathoner - Second Fastest Australian Marathoner of All-Time</p>
                    <button className="mt-2 bg-white text-black px-10 py-3 rounded-md shadow-lg hover:bg-gray-200">
                        SHOP NOW
                    </button>
                </div>
            </div>
            
            <h4 class="text-3xl md:text-4xl font-bold font-display leading-tight text-center mt-20 mb-12">CURRENT MUST-HAVES</h4>

            <ImageCarousel />

            <Footer />
        </div>
    );
}

export default Women;
