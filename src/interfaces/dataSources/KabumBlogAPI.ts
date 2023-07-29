import { BlogPostRepository } from '../../domain/repositories/BlogPostRepository';
import { 
  getAllPosts, 
  getPagePosts, 
  getPostDataById 
} from '../../adapters/kabumScrapingAdapter';

export class KabumBlogAPI implements BlogPostRepository {
  async getPostDataById(id: string) {
    return getPostDataById(id);
  };

  async getPagePosts(page: number) {
    return getPagePosts(page);
  }

  async getAllPosts() {
    return getAllPosts();
  }
};
