const Blog = require("../models/blog");

exports.blogsInDB = async () => {
  return await Blog.find({});
};

exports.initialBlogs = [
  {
    title: "Test Title",
    author: "Test Author",
    url: "test.site.com",
    likes: 123,
  },
  {
    title: "title",
    author: "author",
    url: "url",
    likes: 0,
  },
];
