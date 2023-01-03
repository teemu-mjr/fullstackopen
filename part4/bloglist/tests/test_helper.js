const Blog = require("../models/blog");
const User = require("../models/user");

const bcrypt = require("bcrypt");

const invalidBlogId = async () => {
  const id = Math.floor(Math.random() * 100);
  if (await Blog.findById(id)) {
    return invalidUserId();
  }
  return id;
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const initialBlogs = [
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

const initialUsers = [
  {
    username: "root",
    name: "Superuser",
    password: async () => await bcrypt.hash("secret", 10),
  },
  {
    username: "test-user",
    name: "Test User",
    password: async () => await bcrypt.hash("secret", 10),
  },
];

module.exports = {
  invalidBlogId,
  blogsInDB,
  usersInDB,
  initialBlogs,
  initialUsers,
};
