'use client';
import React from 'react';
import { useCarousel } from '../hooks/useCarousel';

interface CarouselProps {
  count?: number;
}

const Carousel: React.FC<CarouselProps> = ({ count = 5 }) => {
  const { images, current, next, prev, goTo } = useCarousel(count, 3000);

  if (images.length === 0) return <p>Loading...</p>;

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-64 object-cover transition-all duration-700 ease-in-out"
      />

      {/* ปุ่ม Previous */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white px-3 py-1 rounded-full hover:bg-opacity-80"
      >
        ‹
      </button>

      {/* ปุ่ม Next */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white px-3 py-1 rounded-full hover:bg-opacity-80"
      >
        ›
      </button>

      {/* จุดบอกตำแหน่ง */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-white' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
