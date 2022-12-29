const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const Blog = require("../models/blog");

const api = supertest(app);

test("blog posts are returned in json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blog posts have id instead of _id", async () => {
  const blog = new Blog({
    title: "title",
    author: "author",
    likes: 0,
  });
  expect(blog.toJSON().id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
