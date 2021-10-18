const { Router } = require("express");
const router = new Router();

//model imports
const Space = require("../models").space;

//GET all spaces `localhost:4000/spaces`
router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    res.send(spaces);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
