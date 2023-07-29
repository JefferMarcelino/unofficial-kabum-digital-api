import type { BlogPost } from '../models/BlogPost';
import type { GetPagePostsResponse } from '../models/GetPagePostsResponse';
import type { GetAllPosts } from '../models/GetAllPosts';

export interface BlogPostRepository {
  getPostDataById(id: string): Promise<BlogPost>;
  getPagePosts(page: number): Promise<GetPagePostsResponse | any>;
  getAllPosts(): Promise<GetAllPosts>;
};
