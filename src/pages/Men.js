import React, { useState } from 'react';
import Navbar from '../components/NavbarMenu';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import m1 from '../assets/images/men-decorate1.jpg';
import basketball from '../assets/images/men-decorate2.jpg';
import soccer from '../assets/images/men-decorate3.jpg';
import motor from '../assets/images/men-decorate4.jpg';
import running from '../assets/images/men-decorate5.jpg';
import gym from '../assets/images/men-decorate6.jpg';
import golf from '../assets/images/men-decorate7.jpg';



function Men() {
    return (
        <div>
            <Navbar />

            <div className="relative mt-32">
                <img src={m1} className="w-full" alt="Your Image" />
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

            <div className="flex flex-col md:flex-row justify-center gap-5 mb-10">
                <img src={basketball} alt="Basketball Shoe" className="w-full md:max-w-[700px] h-auto" />
                <img src={soccer} alt="Soccer Shoe" className="w-full md:max-w-[700px] h-auto" />
            </div>
            <div className="flex flex-wrap justify-center gap-5">
                <img src={motor} alt="Motor Shoe" className="w-full sm:max-w-[340px] h-auto" />
                <img src={running} alt="Running Shoe" className="w-full sm:max-w-[340px] h-auto" />
                <img src={gym} alt="Gym Shoe" className="w-full sm:max-w-[340px] h-auto" />
                <img src={golf} alt="Golf Shoe" className="w-full sm:max-w-[340px] h-auto" />
            </div>
            
            <h4 class="text-3xl md:text-4xl font-bold font-display leading-tight text-center mt-20 mb-12">CURRENT MUST-HAVES</h4>

            <ImageCarousel />

            <Footer />
        </div>
    );
}

export default Men;
