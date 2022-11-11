const express = require("express");
const app = express();
const config = require("./utils/config")
const mongoose = require("mongoose");
const cors = require("cors");

const blogRouter = require("./controllers/blogs");

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
