const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const config = require("../utils/config");

blogsRouter.get("/", async (_req, res) => {
  const blogs = await Blog.find({}) //
    .populate("user", {
      username: 1,
      name: 1,
    });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  // check for title and url
  if (!req.body?.title || !req.body?.url) {
    return res.sendStatus(400);
  }
  // set likes to 0 if missing
  if (req.body.likes === undefined) {
    req.body.likes = 0;
  }

  try {
    const decodedToken = jwt.verify(req.token, config.SECRET);
    var user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
  } catch (err) {
    return next(err);
  }

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

blogsRouter.patch("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  } catch (err) {
    return next(err);
  }

  res.sendStatus(204);
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ error: "blog not found" });
    }
    await blog.remove();
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ message: "blog removed" });
});

module.exports = blogsRouter;
