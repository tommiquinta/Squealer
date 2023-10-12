"use client"
import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

    return (
        <MapContext.Provider value={{ position, setPosition }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapContext = () => useContext(MapContext);
