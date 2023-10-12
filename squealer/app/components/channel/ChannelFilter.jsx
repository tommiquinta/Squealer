'use client';
import { useState } from "react";
import Card from '../Card';

export default function ChannelFilter({filter}){

    const [filterName, setFilterName] = useState('');

    function sendSearch(){
        filter(filterName);
    }

    return(
        <div className=" w-10/12">
            <Card noPadding={true}>
                <div className="flex flex-col gap-2 p-3 items-bottom">
                    <label className="text-sm text-slate-400">Search by channel&apos;s name:</label>

                    <div className="flex  gap-2 w-12/12">
                        <input type="text" value={filterName} placeholder="Search by name" onChange={(e) => setFilterName(e.target.value)}
                        className="border-2 rounded border-slate-200 px-2 w-full"/>
                        <button type="submit" onClick={sendSearch} className="text-white bg-socialBlue rounded w-fit h-fit mx-auto px-2 py-1 text-sm flex gap-1 items-center">
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-4 h-4'
                        >
                            <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                        </svg>Search</button>
                    </div>
                </div>
            </Card>
        </div>

    );
}