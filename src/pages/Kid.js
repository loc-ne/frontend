import React, { useState } from 'react';
import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import kid_image from '../assets/images/kid-decorate1.jpg';
import t1 from '../assets/images/kid-decorate4.jpg';
import t2 from '../assets/images/kid-decorate5.jpg';
import t3 from '../assets/images/kid-decorate6.jpg';

import basketball from '../assets/images/kid-decorate2.jpg';
import soccer from '../assets/images/kid-decorate3.jpg';

function Kid() {
    return (
        <div>
            <Navbar />

            <div className="relative mt-32">
                <img src={kid_image} className="w-full" alt="Your Image" />
                <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-white px-4 py-2">
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


            <div className="flex flex-col md:flex-row justify-center gap-5 mb-10">
                <img src={basketball} alt="Basketball Shoe" className="w-full md:max-w-[850px] h-auto" />
                <img src={soccer} alt="Soccer Shoe" className="w-full md:max-w-[850px] h-auto" />
            </div>



            <h4 class="text-3xl md:text-4xl font-bold font-display leading-tight text-center mt-20 mb-12">SHOP TRENDING SHOES</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 m-24">
                <img src={t1} alt="Trend 1" className="w-full h-auto" />
                <img src={t2} alt="Trend 2" className="w-full h-auto" />
                <img src={t3} alt="Trend 3" className="w-full h-auto" />
            </div>

            <Footer />
        </div>
    );
}

export default Kid;
