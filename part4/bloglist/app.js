const express = require("express");
const app = express();
const config = require("./utils/config")
const mongoose = require("mongoose");
const cors = require("cors");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
