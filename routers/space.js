const { Router } = require("express");
const router = new Router();
const authMiddleware = require("../auth/middleware");

//model imports
const Space = require("../models").space;
const Story = require("../models").story;

//GET all spaces `localhost:4000/spaces`
router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    res.send(spaces);
  } catch (e) {
    next(e);
  }
});

//GET single space `localhost:4000/spaces/:id`
router.get("/:id", async (req, res, next) => {
  try {
    const spaceId = req.params.id;
    const singleSpace = await Space.findByPk(spaceId, {
      include: [Story],
    });
    if (!singleSpace) {
      res.status(404).send("No space found for this id");
    } else {
      res.send(singleSpace);
      console.log("single space in back end", singleSpace);
    }
  } catch (e) {
    next(e);
  }
});

//POST a new story
router.post("/:id/story", authMiddleware, async (req, res, next) => {
  try {
    const space = await Space.findByPk(req.params.id);
    console.log("space in endpoint", space);

    if (!space) {
      return res.status(404).send({ message: "This space does not exist" });
    }

    if (!space.userId === req.user.id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to update this space" });
    }

    const { name, content, imgUrl } = req.body;
    if (!name) {
      res.status(400).send("Story name is required");
    } else {
      const newStory = await Story.create({
        name,
        content,
        imgUrl,
        spaceId: space.id,
      });
      res.send(newStory);
    }
  } catch (e) {
    next(e);
  }
});

// PUT - Edit a Space
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const space = await Space.findByPk(req.params.id);
    console.log("space in endpoint", space);

    if (!space) {
      return res.status(404).send({ message: "This space does not exist" });
    } else if (!space.userId === req.user.id) {
      return res
      .status(403)
      .send({ message: "You are not authorized to update this space" });
    } else {
      const { title, description, backgroundColor, color } = req.body;
      const updatedSpace = await space.update({
        title,
        description,
        backgroundColor,
        color,
      });
      res.send(updatedSpace);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
