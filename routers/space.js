const { Router } = require("express");
const router = new Router();

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

module.exports = router;
