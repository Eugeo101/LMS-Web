const router = require("express").Router();

const isAuth = require("../middlewares/isAuthenticated");
const hasAccess = require("../middlewares/hasAccess");
const upload = require("../middlewares/upload");

const { addUser, getUsers, delUser, login, submitAss, getToken } = require("../controllers/users");

router.post("/login", login);
router.post("/getToken", getToken);
router.post("/getType/:type", getUsers);
router.post("/addUser", isAuth, hasAccess(0), addUser);
router.post(
    "/submitAss/:courseId/:assNo",
    isAuth,
    hasAccess(2),
    // upload({}, { fileTypes: ["pdf"] }),
    submitAss
);
// router.post('/course_instructor:Course_id', updateInstructor)
router.delete("/delUser/:id", isAuth, hasAccess(0), delUser);

module.exports = router;
