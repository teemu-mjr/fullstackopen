const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.reqLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter, middleware.userExtractor);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
