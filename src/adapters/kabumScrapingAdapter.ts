import { load } from "cheerio";
import { BlogPost } from "../domain/models/BlogPost";
import api from "../lib/axios";
import { GetPagePostsResponse } from "../domain/models/GetPagePostsResponse";
import { GetAllPosts } from "../domain/models/GetAllPosts";
import { cache, getFromCache } from "./cache/cachingFunctions";

export const getPostDataById = async (id: string): Promise<BlogPost> => {
  const cachedPost = await getFromCache(id) as BlogPost;

  if (cachedPost) {
    return cachedPost;
  };

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

  await cache(id, data);

  return data;
};

export const getPagePosts = async (page: number): Promise<GetPagePostsResponse | any> => {
  const cachedPosts = await getFromCache(`page:${page}`) as BlogPost[];

  if (cachedPosts) {
    return cachedPosts;
  };

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
    console.error(err);
    return;
  };

  await cache(`page:${page}`, response);

  return response;
};

export const getAllPosts = async (): Promise<GetAllPosts> => {
  const NUMBER_OF_INUTIL_CONTENT = 20;
  const MAX_CONCURRENT_REQUESTS = 10;

  const allPosts: any = {
    posts: [],
    total: 0
  };

  const cachedPosts = await getFromCache(`all`) as BlogPost[];

  if (cachedPosts) {
    allPosts.posts = cachedPosts;
    allPosts.total = allPosts.posts.length;

    return allPosts;
  };

  let currentPage = 1;

  while (true) {
    const pagePromises: Promise<GetPagePostsResponse | any>[] = [];

    for (let i = 0; i < MAX_CONCURRENT_REQUESTS; i++) {
      pagePromises.push(getPagePosts(currentPage + i));
    }

    const responses = await Promise.all(pagePromises);

    let stopFetching = true;

    for (const response of responses) {
      if (response && response.next) {
        allPosts.posts.push(...response.posts);
        stopFetching = false;
      } else {
        stopFetching = true;
        break;
      };
    };

    if (stopFetching) {
      break;
    };

    currentPage += MAX_CONCURRENT_REQUESTS;
  };

  allPosts.total = allPosts.posts.length - NUMBER_OF_INUTIL_CONTENT;
  allPosts.posts = allPosts.posts.slice(0, allPosts.total);

  await cache("all", allPosts.posts);

  return allPosts;
};
