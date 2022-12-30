const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  // check for title and url
  if (!req.body?.title || !req.body?.url) {
    return res.sendStatus(400);
  }

  // set likes to 0 if missing
  if (req.body.likes === undefined) {
    req.body.likes = 0;
  }

  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).json(result);
});

module.exports = blogRouter;
