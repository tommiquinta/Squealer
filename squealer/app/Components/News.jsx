import Card from '@/app/Components/Card'
import Link from 'next/link'
import Reaction from './Reaction/Reaction';

export default function News({title, link, info, image}){
    return(
        <Card>
            <Link href={link}>
                <div className='flex gap-3 items-center'>
                    <div className='my-2'>
                    <img
                        src={image[0].src}
                        alt='news pic'
                        style={{ width: image.width, height: image.height, objectFit: 'cover' }}
                    />
                    </div>
                    <div className='flex flex-col'>
                        <p className="font-family text-lg font-semibold text-black my-2">{title}</p>
                        <p className="text-sm font-sans text-gray-600"> {info}</p>
                    </div>

                </div>
            </Link>
            <div className=''>
           
            </div>
    </Card >
    );
}

//Todo: insert   <Reaction
                //id={}/>