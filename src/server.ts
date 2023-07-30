import express from "express";
import bodyParser from "body-parser";
import { BlogPostController } from "./interfaces/controllers/BlogPostController";
import { KabumBlogAPI } from "./interfaces/dataSources/KabumBlogAPI";

const PORT = process.env.PORT || 3000 

const app = express()
app.use(bodyParser.json())

const blogPostController = new BlogPostController(new KabumBlogAPI());

app.get("/", async (req, res) => {
  res.status(200).send({ "message": "Working! Acsesss https://github.com/JefferMarcelino/unofficial-kabum-digital-api to see the endpoints." });
});

app.get("/post/:id", async (req, res) => {
  // Data from a post
  blogPostController.getPostDataById(req, res);
});

app.get("/all/:page", async (req, res) => {
  // All posts from a page
  blogPostController.getAllPostsFromPage(req, res);
});

app.get("/all", async (req, res) => {
  // All posts
  blogPostController.getAllPosts(req, res);
});

app.get("/random", async (req, res) => {
  // Random pages from a page
  blogPostController.getRandomPost(req, res);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
