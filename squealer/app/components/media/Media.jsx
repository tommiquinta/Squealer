"use client"

import React, { useState, useEffect } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import { MapProvider, useMapContext } from '../../context/MapContext'
import dynamic from 'next/dynamic'

export default function Media({ media, hideMap }) {

    const Mappa = dynamic(() => import('./Mappa'), { ssr: false })
    const [currentIndex, setCurrentIndex] = useState(0)

    
    const slides =
        (media?.map((item, index) => {
            if (item.lat && item.lng) {
                return {
                    coords: item,
                    id: index,
                    type: 'map'
                }
            } else {
                return {
                    url: item,
                    id: index,
                    type:
                        item?.endsWith('.mp4') || item.endsWith('.mkv') ? 'video' :
                            item?.includes('.png') || item?.includes('.jpg') ? 'image' : 
                            item?.includes('jpeg') ? 'jpeg' : null
                }
            }

        }))

    useEffect(() => { setCurrentIndex(0) }, [])

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides?.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides?.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToSlide = (slideIndex) => { setCurrentIndex(slideIndex) }

    return slides?.length > 0 ? (
        <div className='h-[400px] w-full m-auto py-2 px-4 relative group'>
            {/* Check se l'elemento in preview è un'immagine o un video o una mappa */}
            
            {slides[currentIndex]?.type === 'image' ? (
                // Mostra un elemento immagine se il tipo è 'immagine'
                
                <div
                    style={{
                        backgroundImage: `url('${slides[currentIndex]?.url}')`,
                        backgroundRepeat: 'no-repeat',
                    }}
                    className='w-full h-full rounded-2xl bg-center bg-contain duration-500'
                ></div>
            ) : slides[currentIndex]?.type === 'video' ? (
                // Mostra un elemento video se il tipo è 'video'
                <video
                    src={slides[currentIndex]?.url}
                    className='w-full h-full rounded-2xl bg-center bg-contain duration-500'
                    controls // Mostra i controlli del video
                />
            ) : slides[currentIndex]?.type === 'map' && !hideMap ? (
                <MapProvider>
                    <Mappa lat={slides[currentIndex]?.coords.lat} lng={slides[currentIndex]?.coords.lng} stile={!hideMap} />
                </MapProvider>
            ) : slides[currentIndex]?.type === 'jpeg' ? (
                <img src={slides[currentIndex]?.url}
                    className='w-full h-full rounded-2xl bg-center bg-contain duration-500 object-cover'
                />
            ) : <div
                    style={{
                        backgroundImage: `url('${slides[currentIndex]?.url}')`,
                        backgroundRepeat: 'no-repeat',
                    }}
                    className='w-full h-full rounded-2xl bg-center bg-contain duration-500'
                ></div>
            }

            {slides?.length > 1 && (
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
                        {slides?.map((slide, slideIndex) => (
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
    ) : null
} 