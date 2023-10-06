import Avatar from "../Avatar";
import Cover from '../profile/Cover';

export default function ChannelView({avatar, banner, editable, children}){
    return(
            <div className="flex gap-4 items-center">
                <div className="w-6/12">
                    <Cover url={banner} editable={editable}/>
                    <div className="relative -mt-12 w-full">
                        <div className="border-white border-4 bg-white rounded-full w-fit mx-auto">
                            <Avatar url={avatar} size='big' editable={editable}/>
                        </div>
                    </div>
                </div>
                {children}
            </div>
    );
}