const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const api = supertest(app);

const helper = require("./test_helper");

const Blog = require("../models/blog");

describe("when there is initially some blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });
  test("blogs are returned in json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("addition of a new blog", () => {
  test("succeeds with statuscode 200 with valid data", async () => {
    const newBlog = {
      title: "POST",
      author: "Jest",
      url: "test.jest",
      likes: 1,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(helper.initialBlogs.length + 1);

    const dbBlog = res.body.find((b) => b.title === newBlog.title);
    expect(dbBlog.title).toEqual(newBlog.title);
    expect(dbBlog.author).toEqual(newBlog.author);
    expect(dbBlog.url).toEqual(newBlog.url);
  });

  test("likes default to 0 if not set", async () => {
    await api
      .post("/api/blogs")
      .send({
        title: "LIKES",
        author: "Jest",
        url: "test.jest",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(res.body[res.body.length - 1].likes).toEqual(0);
  });

  test("fails with statuscode 400 without url", async () => {
    await api
      .post("/api/blogs")
      .send({
        title: "No Url",
        author: "Jest",
        likes: 0,
      })
      .expect(400);
  });

  test("fails with statuscode 400 wihtout title", async () => {
    await api
      .post("/api/blogs")
      .send({
        author: "Jest",
        url: "No.Title",
        likes: 0,
      })
      .expect(400);
  });
});

describe("update of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];

    await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: "UPDATE TITLE",
        author: "UPDATE AUTHOR",
        url: "UPDATE URL",
        likes: 1000,
      })
      .expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd[0].title).toEqual("UPDATE TITLE");
    expect(blogsAtEnd[0].author).toEqual("UPDATE AUTHOR");
    expect(blogsAtEnd[0].url).toEqual("UPDATE URL");
    expect(blogsAtEnd[0].likes).toEqual(1000);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    await api
      .patch(`/api/blogs/${helper.invalidBlogId}`) //
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`) //
      .expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    await api
      .delete(`/api/blogs/${helper.invalidBlogId}`) //
      .expect(400);
  });
});

test("blogs have id instead of _id", async () => {
  const blog = new Blog({
    title: "Testing id",
    author: "Jest",
    url: "jest.test",
    likes: 0,
  });
  expect(blog.toJSON()._id).not.toBeDefined();
  expect(blog.toJSON().id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
