import axios from "axios";
import { load } from "cheerio";

const getPostsLinks = async (category: "mostread" | "all") => {
    if (category == "mostread") {
        const latestNews = await axios.get("https://kabum.digital/")

        const $ = load(latestNews.data); 

        const postsData = $(".cnvs-block-section-1587397232048")
        .map((_, post) => { 
            const $post:any = $(post);

            const $titles = $post.find(".cs-entry__title")
            .map((_:any, title:any) => { 
                const $title:any = $(title); 
                const $link = $title.find("a")
                var link = $link.attr('href');
                if (link && title) {
                    return {
                        title: $title.text().trim(),
                        link: link
                    }
                }
            }) 
            .toArray(); 

            return $titles
        }) 
        .toArray(); 

        return postsData
    } else if (category == "all") {
        let next = true
        var allLinks: any[] = []
        let index = 0

        while (next) {
            try {
                let latestNews = await axios.get(`https://kabum.digital/page/${index}/?s=a`)
                const $ = load(latestNews.data); 

                const allPosts = $("#primary")
                .map((_, post) => { 
                    const $post:any = $(post);

                    const $titles = $post.find(".cs-entry__title")
                    .map((_:any, title:any) => { 
                        const $title:any = $(title); 
                        const $link = $title.find("a")
                        var link = $link.attr('href');
                        
                        if (link && title) {
                            return {
                                title: $title.text().trim(),
                                link: link
                            }
                        }
                    }) 
                    .toArray(); 

                    return $titles
                }) 
                .toArray();
                allLinks.push(...allPosts)
                index++
            } catch (err) {
                next = false
            }
        }

        return allLinks
    }
}

export default getPostsLinks