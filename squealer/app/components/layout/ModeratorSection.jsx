import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Card from "../Card";
import PublicChannelsWidget from "./PublicChannelsWidget";

export default async function ModeratorSection() {

    const supabase = createServerComponentClient();

    //visualizza canali pubblici
    const resultSqueals = await supabase.rpc('get_public_list');
    const squeals = resultSqueals.data;
    //visualizza trend

    return (
        <div>
            <Card>
                <p>qui canali pubblici</p>
                {squeals && squeals.map(publicChannel =>
                    <PublicChannelsWidget channel={publicChannel} />
                )}
            </Card>
            <Card>
                <p>qui i trend - select all from posts where count(like) maggiore di CM</p>
            </Card>
        </div>
    );
}