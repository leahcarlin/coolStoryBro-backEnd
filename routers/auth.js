const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const { SALT_ROUNDS } = require("../config/constants");
const { Router } = require("express");
const router = new Router();

//Import Models
const User = require("../models/").user;
const Space = require("../models/").space;
const Story = require("../models").story;

// User Login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({
      where: { email },
      include: { model: Space, include: { model: Story } },
    });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//User signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });
    console.log(newUser);
    delete newUser.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ userId: newUser.id });

    const newSpace = await Space.create({
      title: `${name}'s Space`,
      description: null,
      backgroundColor: "#ffffff",
      color: "000000",
      userId: newUser.id,
    });
    console.log(newSpace);

    res
      .status(201)
      .json({ ...newUser.dataValues, space: newSpace.dataValues, token });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  const space = await Space.findOne({
    where: { userId: req.user.id },
    include: { model: Story }, // include more info in user object
  });
  console.log("the space found", space.dataValues);
  // don't send back the password hash
  delete req.user.dataValues["password"];
  res
    .status(200)
    .send({ ...req.user.dataValues, space: { ...space.dataValues } });
});

// DELETE a story
router.delete("/stories/:storyId", async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findByPk(storyId);
    console.log(story);
    if (!story) {
      res.status(404).send("No story found");
    } else {
      await story.destroy();
      res.send({ message: "Story deleted successfully" });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
