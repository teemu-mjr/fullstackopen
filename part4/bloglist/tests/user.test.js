const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const api = supertest(app);

const helper = require("./test_helper");
const User = require("../models/user");

describe("when there is initially some users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });
  test("users are returned in json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all users are returned", async () => {
    const res = await api.get("/api/users");
    expect(res.body).toHaveLength(helper.initialUsers.length);
  });
});

describe("addition of a new user", () => {
  test("succeeds with statuscode 200 with valid data", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      name: "Jest Test",
      username: "jest",
      password: "secret",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const dbUser = usersAtEnd.find((u) => u.username === newUser.username);
    expect(dbUser.name).toEqual(newUser.name);
    expect(dbUser.username).toEqual(newUser.username);

    expect(usersAtEnd);
  });

  test("fails with statuscode 400 with taken username", async () => {
    await api
      .post("/api/users")
      .send({
        name: "Superuser",
        username: "root",
        password: "secret",
      })
      .expect(400);
  });

  test("fails with statuscode 400 without username", async () => {
    await api
      .post("/api/users")
      .send({
        name: "Jest Test",
        password: "secret",
      })
      .expect(400);
  });

  test("fails with statuscode 400 without password", async () => {
    await api
      .post("/api/users")
      .send({
        name: "Jest Test",
        username: "jest",
      })
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
