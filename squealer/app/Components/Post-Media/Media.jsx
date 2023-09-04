import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

export default function Media({ uploads }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    //TODO sistemare nel DB il campo uploads che per ora si chiama photos e quindi aggiornare il codice e tutte le query

    // Creare un nuovo array slides utilizzando gli URL delle immagini e dei video da uploads
    const slides = uploads.map((upload, index) => ({
        url: upload,
        id: index, 
        type: upload.endsWith('.mp4'||'.mkv') ? 'video' : 'image',
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
    }, [uploads]);

    return (
        <div className='h-[400px] w-full m-auto py-2 px-4 relative group'>
            {/* Check se l'elemento in in preview è un'immagine o un video */}
            {slides[currentIndex].type === 'image' ? (
                // Mostra un elemento immagine se il tipo è 'immagine'
                <div
                    style={{
                        backgroundImage: `url(${slides[currentIndex].url})`,
                        backgroundRepeat: 'no-repeat',
                    }}
                    className='w-full h-full rounded-2xl bg-center bg-contain duration-500'
                ></div>
            ) : (
                // Mostra un elemento video se il tipo è 'video'
                <video
                    src={slides[currentIndex].url}
                    className='w-full h-full rounded-2xl bg-center bg-contain duration-500'
                    controls // Mostra i controlli del video
                ></video>
            )}

            {slides.length > 1 && (
                <div className=''>
                    {/* Freccia a sinistra */}
                    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                        <BsChevronCompactLeft onClick={prevSlide} size={30} />
                    </div>
                    {/* Freccia a destra */}
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
                </div>
            )}
        </div>
    );
}
