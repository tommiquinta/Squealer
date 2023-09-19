import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Card from '../Card';
import moment from 'moment';
import Avatar from '../Avatar';


export default async function PublicChannelsPost(
  { post }
) {
    const supabase = createServerComponentClient({ cookies });

    var info = null;
    if(post.channel_id == null){
        info = await supabase.from('profiles').select('username, avatar').eq('uuid', post.author);
    } else {
      info = await supabase.from('public_channels').select("name, avatar").eq('id', post.channel_id);
    }

    info = info.data[0];

    //devo gestire che se è un canale (quindi channel id != null ) allora devo mettere foto e info del canale
   return (
    <Card>
      <div className='flex gap-3'>
        <div>
{/*           <Link href={'/profile/' + authorProfiles?.id}>
 */}            <span className='cursor-pointer'>
              <Avatar url={info?.avatar} />
            </span>
{/*           </Link>
 */}        </div>
        <div className='flex flex-col'>
          <p>
{/*             <Link href={'/profile/' + authorProfiles?.id}>
 */}              <span className='font-semibold hover:underline cursor-pointer '>
                {info?.name ? info.name : info.username}
              </span>{' '}
              shared a squeal
{/*             </Link>
 */}          </p>
          <p className='text-gray-500 text-sm'>
            {moment(post.created_at).fromNow()}
          </p>
        </div>
      </div>

 <div className='my-4'>
        <p className='my-3 text-md'>
          {post.content}
        </p>

        <div className=''>
          {post.photos?.length > 0 && (
            <div className='mt-4 flex justify-center items-center'>
              {post.photos.length === 4 ? (
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="p-2">
                        <img src={photos[0]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                      <td className="p-2">
                        <img src={photos[1]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <img src={photos[2]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                      <td className="p-2">
                        <img src={photos[3]} className="w-full h-auto rounded-md object-cover" alt="" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className='flex gap-2.5'>
                  <div className='flex justify-center items-center'>
                    <img src={post.photos[0]} className="w-auto rounded-md object-cover" alt="" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

    </div>
      
      <p>{post.likes} </p>
      <p>{post.dislikes} </p>

     {/*  <div className=''>
        <Reaction
          id={id}
        />
      </div> */}

    </Card >
  )
}
  
