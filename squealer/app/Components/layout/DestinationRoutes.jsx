'use client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllSqueals from "./AllSqueals";
import Card from "../Card";

export default function DestinationRoutes({user, squeals}){

    console.log("destination")
    return(
        
            <Routes>
                    <Route index path={`/`} element={<AllSqueals squeals={squeals}/>}/>
                    <Route path={`/channels`} element={"Tommi devi inserire la gestione dei canali privati qui"}/>
                    <Route path={`/settings`} element={<Card><p>impostazioni utente</p></Card>}/>
            </Routes>
    )
}