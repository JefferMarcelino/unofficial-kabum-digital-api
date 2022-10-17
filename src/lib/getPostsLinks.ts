import axios from "axios";
import { load } from "cheerio";

interface getPostByLinksProps {
    title: string;
    link: string;
}

const getPostsLinks = async (category: "mostread" | "all" | "latest", page?:number): Promise<getPostByLinksProps[] | any> => {
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
    } else if (category == "latest") {
        try {
            let latestNews = await axios.get(`https://kabum.digital/`)
            const $ = load(latestNews.data); 

            const $latest = $(".cnvs-block-posts-1587397404812")
            
            return {
                "title": $latest.find(".cs-entry__title").text().trim(),
                "link": $latest.find("a").attr("href")
            }
        } catch (err) {
            console.log(err)
        }
    } else if (category == "all") {
        let next = true
        var allLinks: any[] = []
        let index = page || 1

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
        } catch (err) {
            console.log(err)
        }

        return allLinks
    }
}

export default getPostsLinks