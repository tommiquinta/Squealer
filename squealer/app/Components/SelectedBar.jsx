export default function SelectedBar({selected}){

    if(selected){
        return(
            <div className="border-b-4 rounded-sm border-socialBlue text-sky-600 w-4"></div>
        )
    } else {
        return(
            <div ></div>
        )
    }
}