import axios from "axios"
import { load } from "cheerio"

const getPostByLink = async (link:string) => {
    const post = await axios.get(link)
    const $ = load(post.data + "")

    const $image = $(".wp-post-image")
    const image = $image.attr('src')

    const content = $(".entry-content")
    .map((_:any, content:any) => { 
        const $content:any = $(content); 
        const $paragraphs:any = $content.find("p") 
        .map((_:any, paragraph:any) => { 
            const $text = $(paragraph)
            return $text.text()
        }) 
        .toArray();

        return $paragraphs
    }) 
    .toArray();

    const data = {
        "title": $(".cs-entry__title").text(),
        "link": link,
        "image": image,
        "content": content
    }

    return data
}

export default getPostByLink