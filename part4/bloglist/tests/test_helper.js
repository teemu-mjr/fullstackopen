const Blog = require("../models/blog");
const User = require("../models/user");

exports.blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

exports.usersInDB = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
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

exports.initialUsers = [
  {
    username: "root",
    name: "Superuser",
    password: "secret",
  },
  {
    username: "test-user",
    name: "Test User",
    password: "secret",
  },
];
