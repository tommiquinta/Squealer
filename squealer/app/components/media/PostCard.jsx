import Card from '../Card';

// import Reaction from './Reaction/Reaction';

export default function PostCard(
    {
        content
     
    }
) {
    return (
        <Card>
            <p className='my-5 text-md'>
                {content}
            </p>
        </Card >
    );
} 