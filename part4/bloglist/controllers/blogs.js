const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const logger = require("../utils/logger");

blogsRouter.get("/", async (_req, res) => {
  const blogs = await Blog.find({}) //
    .populate("user", {
      username: 1,
      name: 1,
    });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  // check for title and url
  if (!req.body?.title || !req.body?.url) {
    return res.sendStatus(400);
  }

  // set likes to 0 if missing
  if (req.body.likes === undefined) {
    req.body.likes = 0;
  }

  // TODO: get the real blog owner
  const user = await User.findOne({});

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.patch("/:id", async (req, res) => {
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

blogsRouter.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .send(`could not find blog with id: ${req.params.id}`);
  }

  res.sendStatus(204);
});

module.exports = blogsRouter;
