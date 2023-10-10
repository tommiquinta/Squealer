'use client';
import Link from 'next/link';
import Card from '../Card';

export default function Square( {name, url, description }){
    url = url ? url : '/';
   
    return(
        <Link href={url} className='min-h-full'>
            <Card add={'min-h-full'}>
                <p className='text-3xl text-socialBlue p-2 m-2'>{name}</p>
                <p className='text-base text-slate-400 p-4 m-2 mt-3 text-left'>{description}...</p>
            </Card>
        </Link>
    )
}