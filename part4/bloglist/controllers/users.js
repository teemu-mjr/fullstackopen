const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (_req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (username === undefined || password === undefined) {
    return res.status(400).json({ message: "content missing" });
  }

  if (username.length < 3) {
    return res
      .status(400)
      .json({ message: "username must be atleast 3 characters long" });
  }

  if (password.length < 3) {
    return res
      .status(400)
      .json({ message: "password must be atleast 3 characters long" });
  }

  // username must be unique
  if (await User.findOne({ username: username })) {
    return res
      .status(400)
      .json({ message: `username ${username} is in use` });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;