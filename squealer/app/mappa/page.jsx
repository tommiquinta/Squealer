import "leaflet/dist/leaflet.css"
import React, { Suspense } from "react"
import dynamic from 'next/dynamic'
import Preloader from '../components/Preloader';

const Mappa = () => {

    const Cartina = dynamic(() => import('app/components/media/Mappa.jsx'), { ssr: false })

    return (
        <div className="w-96 h-96 mx-auto my-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
            <Suspense fallback={<Preloader />}>
                <Cartina />
            </Suspense>
        </div>

    )
}

export default Mappa
