import { load } from "cheerio";
import { BlogPost } from "../domain/models/BlogPost";
import api from "../lib/axios";
import { GetPagePostsResponse } from "../domain/models/GetPagePostsResponse";
import { GetAllPosts } from "../domain/models/GetAllPosts";


export const getPostDataById = async (id: string): Promise<BlogPost> => {
  const postHTML = await api.get("/" + id);
  const $ = load(postHTML.data + "");

  const $image = $(".wp-post-image");
  const image = $image.attr('data-pk-src') || "";

  const content = $(".entry-content")
    .map((_:any, content:any) => { 
      const $content:any = $(content); 
      const $paragraphs:any = $content.find("p")
        .map((_:any, paragraph:any) => { 
          const $text = $(paragraph)
          return $text.text()
        })
        .toArray();

      return $paragraphs;
    }) 
    .toArray();

  const data = {
    "title": $(".cs-entry__title").text(),
    "link": `${api.defaults.baseURL}/${id}`,
    "image": image,
    "content": content
  };

  return data;
};

export const getPagePosts = async (page: number): Promise<GetPagePostsResponse | any> => {
  const response: any = {
    posts: [],
    prev: null,
    current: null,
    next: null
  };

  const index = page || 1;
  const pathToPage = `/page/${index}/?s=`

  try {
    console.log("Now fetching page", page);
    const pageHTML = await api.get(pathToPage);
    const $ = load(pageHTML.data);

    const $navLinks = $(".nav-links");
    const next = $navLinks.find(".next").attr("href");
    const prev = $navLinks.find(".prev").attr("href");

    response.next = next || null;
    response.prev = prev || null;
    response.current = `${ api.defaults.baseURL + pathToPage }`

    const $allPosts = $("#primary")

    const allMainPagePosts = $allPosts.find(".cs-entry__outer")
      .map((_: any, post: any) => {
        const $post = $(post);

        const $title:any = $post.find(".cs-entry__title"); 

        const $link = $title.find("a");
        const link = $link.attr('href');

        const $description = $post.find(".cs-entry__excerpt");

        const $image = $post.find(".wp-post-image");

        return {
          title: $title.text().trim(),
          link: link,
          image: $image.attr("data-pk-src"),
          id: link.replace("https://kabum.digital/", "").replace("/", ""),
          description: $description.text().trim()
        };
      })
      .toArray();
                  
    response.posts.push(...allMainPagePosts);
  } catch (err) {
    console.log(err);
    return;
  };

  return response;
};

/*
export const getAllPosts = async (): Promise<GetAllPosts> => {
  const allPosts: any = {
    posts: [],
    total: 0
  };

  let page = 1;

  while(true) {
    console.log("Now fetching page ", page)
    const pagePosts = await getPagePosts(page);
    page++;

    allPosts.posts.push(...pagePosts.posts);
    console.log("Page ", page, " fetched with success. There are now ", allPosts.posts.length, " posts fetched")

    if (!pagePosts.next) break;
  }

  allPosts.total = allPosts.posts.length;

  return allPosts;
};
*/

export const getAllPosts = async (): Promise<GetAllPosts> => {
  const allPosts: any = {
    posts: [],
    total: 0
  };

  let page = 1;
  const MAX_CONCURRENT_REQUESTS = 10;
  let canBreak = false;

  const fetchPagePromises: Promise<GetPagePostsResponse>[] = [];

  while (true) {
    for (let i = 0; i < MAX_CONCURRENT_REQUESTS; i++) {
      fetchPagePromises.push(getPagePosts(page));
    };
    
    const pageResponses = await Promise.all(fetchPagePromises);

    for (const response of pageResponses) {
      allPosts.posts.push(...response.posts);
      if (!response.next) canBreak = true;
    }

    if (canBreak) {      
      break;
    };
  };

  allPosts.total = allPosts.posts.length;

  return allPosts;
};


export const getBlogPostsLinks = async (
  category: "mostread" | "all" | "latest", 
  page?:number
): Promise<any> => {
  if (category == "mostread") {
    const latestNews = await api.get("/");

    const $ = load(latestNews.data); 

    const postsData = $(".cnvs-block-section-1587397232048")
      .map((_, post) => { 
        const $post:any = $(post);

        const $titles = $post.find(".cs-entry__title")
          .map((_:any, title:any) => { 
            const $title:any = $(title); 
            const $link = $title.find("a");
            var id = $link.attr('href');

            if (id && title) {
              return {
                title: $title.text().trim(),
                id: id.replace("https://kabum.digital/", "").replace("/", "")
              };
            };
          }) 
          .toArray(); 

        return $titles;
      }) 
      .toArray(); 

    return postsData;
  } else if (category == "latest") {
    try {
      let latestNews = await api.get("/");
      const $ = load(latestNews.data);

      const $latest = $(".cnvs-block-posts-1587397404812");

      console.log($latest.find(".cs-entry__title").text().trim())
      
      return {
        title: $latest.find(".cs-entry__title").text().trim(),
        id: $latest.find("a").attr("href")
          ?.replace("https://kabum.digital/", "")
          .replace("/", "")
      };
    } catch (err) {
      console.log(err);
    }
  } else if (category == "all") {
    
  }
};
