import { Request, Response } from 'express';
import { BlogPostRepository } from '../../domain/repositories/BlogPostRepository';

export class BlogPostController {
  constructor(private readonly blogPostRepository: BlogPostRepository) {};

  async getPostDataById(req: Request, res: Response) {
    const postId = req.params.id;

    try {
      const post = await this.blogPostRepository.getPostDataById(postId);

      res.status(200).send({ "post": post }).end();
    } catch (err) {
      res.status(404).send({ "error": "Post not found" });
    };
  };

  async getAllPostsFromPage(req: Request, res: Response) {
    const page = Number(req.params.page);

    if (Number.isNaN(page)) {
      res.status(400).send({ "error": "page must be a number" });

      return;
    };

    try {
      const posts = await this.blogPostRepository.getPagePosts(page);

      res.status(200).send({ "result": posts }).end();
    } catch (error) {
      res.status(500).send({ "error": "internal server error" })
    };
  };

  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await this.blogPostRepository.getAllPosts();

      res.status(200).send({ "result": posts }).end();
    } catch (error) {
      res.status(500).send({ "error": "internal server error" })
    };
  };

  async getRandomPost(req: Request, res: Response) {
    const CURRENT_PAGES_AVAILABLES = 78
    const randomPage = Math.floor(Math.random() * CURRENT_PAGES_AVAILABLES) + 1;

    try {
      const posts = await this.blogPostRepository.getPagePosts(randomPage);

      res.status(200).send({ "result": posts }).end();
    } catch (error) {
      res.status(500).send({ "error": "internal server error" })
    };
  };
};
