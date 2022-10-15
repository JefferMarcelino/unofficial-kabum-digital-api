import axios from "axios";
import { load } from "cheerio";

const getPostsLinks = async (className:string) => {
    const latestNews = await axios.get("https://kabum.digital/")

    const $ = load(latestNews.data + ""); 
    
    const recentPosts = $(className)
    .map((_, post) => { 
        const $post:any = $(post);

        const $titles = $post.find(".cs-entry__title")
        .map((_:any, title:any) => { 
            const $title:any = $(title); 
            const $link = $title.find("a")
            var link = $link.attr('href');
            return link
        }) 
        .toArray(); 

        return $titles
    }) 
    .toArray(); 

    return recentPosts
}

export default getPostsLinks