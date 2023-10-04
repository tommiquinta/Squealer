import {blockUserById} from '../../../helper/moderatorServerActions';

export default function BlockBtn({id, blocked}){

    async function callBlock(){
        const result = await blockUserById(id);
        if(result){
            alert("This user has been blocked for one day");
        } else {
            alert("Somethign went wrong");
        }
    }

    if(blocked){
        return(
            <div className='text-center self-center -mb-4 '>
            <button className="text-white bg-red-500/70 px-2 py-1 rounded flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6.25"/><path d="m4.25 11.75l8-8"/></g></svg>
               Blocked
            </button>
            </div>
        );
    }

    return(
        <form action={callBlock} className='text-center self-center -mb-4 '>
            <button type="submit" className="text-white bg-red-500 px-2 py-1 rounded flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6.25"/><path d="m4.25 11.75l8-8"/></g></svg>
                Block this user
            </button>
        </form>
    );
}