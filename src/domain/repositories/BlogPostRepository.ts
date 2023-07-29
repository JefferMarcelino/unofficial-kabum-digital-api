import type { BlogPost } from '../models/BlogPost';
import type { GetPagePostsResponse } from '../models/GetPagePostsResponse';
import type { GetAllPosts } from '../models/GetAllPosts';

export interface BlogPostRepository {
  getBlogPostsLinks(
    category: "mostread" | "all" | "latest", 
    page?: number
  ): Promise<string[]>;
  getPostDataById(id: string): Promise<BlogPost>;
  getPagePosts(page: number): Promise<GetPagePostsResponse | any>;
  getAllPosts(): Promise<GetAllPosts>;
};
