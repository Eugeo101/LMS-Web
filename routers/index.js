const router = require("express").Router();
const usersRouter = require("./users");
const coursesRouter = require("./courses");

router.use("/users", usersRouter);
router.use("/courses", coursesRouter);

module.exports = router;
