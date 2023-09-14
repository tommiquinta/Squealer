import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers';

export default function NewTweet() {

    async function addTweet(formData) {
        "use server"
        const content = formData.get('content')
        const supabase = createServerComponentClient({ cookies })
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            await supabase
                .from('posts')
                .insert({
                    author: user.id,
                    content: content,
                })
        }
    }

    return (
        <form action={addTweet}>
            <input
                name='content'
                className='grow p-3 h-18 resize-none'
                placeholder={`What's on your mind?`}
            />
        </form >
    )
}