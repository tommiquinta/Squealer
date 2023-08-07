import Card from "./Card";
import Avatar from "./Avatar";
import Link from "next/link";

export default function PostCard(){
    return(
        <Card>
              <div className='flex gap-3'>
                <div>
                  <Link href={'/profile'}>
                    <span className="cursor-pointer">
                     <div className="w-10 rounded-full overflow-hidden">
                        <img src="https://ssb.wiki.gallery/images/thumb/4/48/Yoshi.png/1200px-Yoshi.png"></img>
                    </div>
                    </span>
                  </Link>
                </div>
                <div>
                  <p>
                    <Link href={'/login'}>
                      <span className="font-semibold hover:underline cursor-pointer">
                       Yoshi
                      </span> shared a squeal.
                    </Link>
                  </p>
                  <p className="text-gray-500 text-sm"> 2 hours ago</p>
                </div>
              </div>
              <div>
                <p className="my-3 text-md"> 
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, enim sit. Libero, doloremque autem provident ipsa numquam ullam modi, suscipit assumenda quisquam voluptatum, fuga porro! Illum quaerat rerum error necessitatibus?
                  lorem
                </p>
              </div>

            </Card>  
    );
}