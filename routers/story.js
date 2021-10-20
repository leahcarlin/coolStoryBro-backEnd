const { Router } = require("express");
const router = new Router();
const authMiddleware = require("../auth/middleware");

//model imports
const Story = require("../models").story;



module.exports = router;
