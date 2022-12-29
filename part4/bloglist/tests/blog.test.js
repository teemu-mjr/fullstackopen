const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const api = supertest(app);

const Blog = require("../models/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(initialBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(initialBlogs[1]);
  await blogObj.save();
});

test("blog posts are returned in json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blog posts have id instead of _id", async () => {
  const blog = new Blog(initialBlogs[0]);
  expect(blog.toJSON().id).toBeDefined();
});

test("blog posts are saved on POST", async () => {
  const newPost = {
    title: "POST",
    author: "Jest",
    url: "test.jest",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const titles = res.body.map((b) => b.title);
  const authors = res.body.map((b) => b.author);
  const urls = res.body.map((b) => b.url);

  expect(res.body).toHaveLength(initialBlogs.length + 1);

  expect(titles).toContain(newPost.title);
  expect(authors).toContain(newPost.author);
  expect(urls).toContain(newPost.url);
});

afterAll(() => {
  mongoose.connection.close();
});
