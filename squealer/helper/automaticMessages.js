'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function checkElon(){
    const supabase = createServerComponentClient({ cookies })

    const {data : recent, error} = await supabase.rpc('is_recent_post', {channelid : 1});

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

        if(error){
            console.log(error);
            return false;
        }
    }
    return true;
}


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
  