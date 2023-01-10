const Blog = require("../models/blog");
const User = require("../models/user");

const bcrypt = require("bcrypt");

const invalidBlogId = async () => {
  const id = Math.floor(Math.random() * 10000);
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
    // bcrypt.hash("secret", 10)
    passwordHash: "$2b$10$khZQIuiogKMOuQKGj9aaueM2DSGCc1baPWTMg5jvwlsjpfEzY4nCS",
    blogs: [],
  },
];

module.exports = {
  invalidBlogId,
  blogsInDB,
  usersInDB,
  initialBlogs,
  initialUsers,
};
