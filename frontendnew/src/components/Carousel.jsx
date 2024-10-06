// src/components/Carousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


const Carousel = ({ items, title }) => {
  // Function to handle download click
  const handleDownload = (item) => {
    // Placeholder for actual fetch and download logic
    console.log(`Downloading PDF for ${item.title}`);
  };

  return (
    <div className="my-12 font-sans text-gray-800">
      <h2 className="text-3xl font-extrabold mb-6 text-center">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1} // Default to showing one card
        className="w-full"
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 }, // Mobile view: 1 card
          768: { slidesPerView: 2, spaceBetween: 25 }, // Medium screens: 2 cards
          1024: { slidesPerView: 3, spaceBetween: 30 }, // Large screens: 3 cards
          1280: { slidesPerView: 4, spaceBetween: 40 }, // Extra large screens: 4 cards
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="min-w-[200px] bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 duration-300 ease-in-out overflow-hidden">
              {/* Image with rounded corners */}
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover rounded-t-xl"
              />
              <div className="p-4 max-h-40 overflow-y-scroll">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
                <button
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 shadow-md"
                  onClick={() => handleDownload(item)}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
