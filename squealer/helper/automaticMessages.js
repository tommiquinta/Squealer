'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function checkElon(){
    const supabase = createServerComponentClient({ cookies })

    const {data : recent, error} = await supabase.rpc('is_recent_post', {channelid : 1});
    console.log(recent);

    //se non ci sono squeal recenti 
    if(!recent){
        //effettua ricerca
        const datas = await searchGoogle('elon musk x news');
        //prendi random
        var number = (Math.floor(Math.random()* datas.articles.length));
        console.log(number)
        console.log(datas.articles[number]);
        
        //inserisci in tabella
        const {data, error} = await supabase.from('posts').insert({
            author : '5288c993-a60d-4425-89f1-911f041bbaff', 
            content : datas.articles[number].title + ': '+ datas.articles[number].description,
            photos : [datas.articles[number].urlToImage ],
            channel_id : 1
        });

        console.log(error);
        console.log(data);

    }
}

export async function checkKitty(){
    const supabase = createServerComponentClient({ cookies })

    const {data : recent, error} = await supabase.rpc('is_recent_post', {channelid : 5});

    
}

// https://www.google.com/search?q=programmable+search+engine+how+to+moves+between+pages+from+terminal&client=safari&sca_esv=571285583&rls=en&sxsrf=AM9HkKnpt8-4ngFU94AByN_hfFfc3lAf-g:1696589658420&ei=WucfZYacGcCC9u8Pt_icUA&start=70&sa=N&ved=2ahUKEwiGsa3_oOGBAxVAgf0HHTc8BwoQ8tMDegQIBBAQ&biw=1512&bih=789&dpr=2
// https://www.google.com/search?q=programmable+search+engine+how+to+moves+between+pages+from+terminal&client=safari&sca_esv=571285583&rls=en&biw=1512&bih=789&sxsrf=AM9HkKlZhCs6GVuqMv0dsMPz3cXmjnM3ow:1696590827282&ei=6-sfZfzfEMD_7_UPouOLwAo&start=60&sa=N&ved=2ahUKEwi8gduspeGBAxXA_7sIHaLxAqg4MhDy0wN6BAgGEA8
async function searchGoogle(query) {
    const NewsAPI = require('newsapi');

    const newsapi = await new NewsAPI(process.env.API_KEY);

    const response = await newsapi.v2.everything({
        q: query,
        language: encodeURI,
        domain : "google.com"
    });
    
    return response;
  }
  