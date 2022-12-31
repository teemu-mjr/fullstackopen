const blogRouter = require("express").Router();
const Blog = require("../models/blog");

const logger = require("../utils/logger");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.json(blogs);
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
  return res.status(201).json(result);
});

blogRouter.patch("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .send(`could not find blog with id: ${req.params.id}`);
  }

  return res.sendStatus(204);
});

blogRouter.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .send(`could not find blog with id: ${req.params.id}`);
  }

  return res.sendStatus(204);
});

module.exports = blogRouter;
