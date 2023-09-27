import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ModeratorSection(){

    const supabase = createServerComponentClient();

    //visualizza canali pubblici
    //visualizza trend

    return(
        <div>
            <Card>
                <p>qui canali pubblici</p>
            </Card>
            <Card>
                <p>qui i trend - select all from posts where count(like) maggiore di CM</p>
            </Card>
        </div>
    );
}