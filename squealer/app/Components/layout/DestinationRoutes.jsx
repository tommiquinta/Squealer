'use client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllSqueals from "./AllSqueals";

export default function DestinationRoutes({user, squeals}){

    console.log("destination")
    return(
        
            <Routes>
                    <Route index path={`${user}`} element={<AllSqueals squeals={squeals}/>}/>
                    {/*<Route path={`${user}/channels`} element={"PublicChannels"}/>
                    <Route path={`${user}/moderators`} element={<Card></Card>}/>*/}
            </Routes>
    )
}