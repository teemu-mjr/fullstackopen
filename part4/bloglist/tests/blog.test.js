const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");

const api = supertest(app);

test("blog posts are returned in json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});
