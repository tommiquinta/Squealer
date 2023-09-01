import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

export default function Media({ photos }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Creare un nuovo array slides utilizzando gli URL delle immagini da photos
    const slides = photos.map((photo, index) => ({
        url: photo,
        id: index, // Puoi aggiungere un ID univoco se necessario
    }));

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        // Reset currentIndex se photos cambia
        setCurrentIndex(0);
    }, [photos]);

    return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
            {slides.length > 0 && (
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                    className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
                ></div>
            )}
            {slides.length > 1 && (
                <>
                    {/* Left Arrow */}
                    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <BsChevronCompactLeft onClick={prevSlide} size={30} />
                    </div>
                    {/* Right Arrow */}
                    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <BsChevronCompactRight onClick={nextSlide} size={30} />
                    </div>
                    <div className='flex top-4 justify-center py-2'>
                        {slides.map((slide, slideIndex) => (
                            <div
                                key={slideIndex}
                                onClick={() => goToSlide(slideIndex)}
                                className={`text-2xl cursor-pointer ${slideIndex === currentIndex ? 'text-primary' : 'text-gray-500'}`}
                            >
                                <RxDotFilled />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
