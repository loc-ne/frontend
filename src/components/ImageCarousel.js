import React, { useState } from 'react';

import S1 from '../assets/images/s1.jpg';
import S2 from '../assets/images/s2.jpg';
import S3 from '../assets/images/s3.jpg';
import S4 from '../assets/images/s4.jpg';
import S5 from '../assets/images/s5.jpg';
import S6 from '../assets/images/s6.jpg';
import S7 from '../assets/images/s7.jpg';
import S8 from '../assets/images/s8.jpg';

const images = [S1, S2, S3, S4, S5, S6, S7, S8];
const nameShoes = [
  "PUMA x LAMELO BALL MB.03 Be You Men's Basketball Shoes",
  "PUMA x LAMELO BALL MB.03 Be You Men's Basketball Shoes",
  "MELO x DEXTER'S LAB MB.03 Men's Basketball Shoes",
  "PUMA x LAMELO BALL MB.03 Iridescent Men's Basketball Shoes",
  "PUMA x PLAYSTATION® RS-X Men's Sneakers",
  "RS-XK Sneakers",
  "PUMA-180 PRM Women's Sneakers"
];
const totalImages = images.length;

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < totalImages - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="relative mb-44 m-24">
      <div className="overflow-hidden">
        <div className="flex w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full md:w-1/4">
              <img src={image} alt={`Image ${index + 1}`} className="w-full h-auto mb-2 rounded-lg" />
              <h3 className="text-left ml-4 text-lg font-semibold text-gray-900">{nameShoes[index]}</h3>
            </div>
          ))}
        </div>
      </div>
      <button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-md -translate-x-full" 
        onClick={prevSlide} 
        disabled={currentIndex === 0}
      >
        &lt;
      </button>
      <button 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-md translate-x-full" 
        onClick={nextSlide}
        disabled={currentIndex === totalImages - 1}
      >
        &gt;
      </button>
    </div>
  );
}

export default ImageCarousel;
