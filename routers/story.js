const { Router } = require("express");
const router = new Router();
const authMiddleware = require("../auth/middleware");

//model imports
const Story = require("../models").story;

// DELETE a story
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const story = await Story.findByPk(parseInt(id));
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
