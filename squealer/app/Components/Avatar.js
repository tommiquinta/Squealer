export default function Avatar({url}){
    return(
          <div className="${width} rounded-full overflow-hidden">
                        <img src={url} alt=""></img>
                    </div>
    );
}