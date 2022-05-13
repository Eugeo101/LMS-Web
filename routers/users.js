const router = require("express").Router();

const isAuth = require("../middlewares/isAuthenticated");
const hasAccess = require("../middlewares/hasAccess");
const upload = require("../middlewares/upload");

const { addUser, delUser, login, submitAss } = require("../controllers/users");

router.post("/login", login);
router.post("/addUser", isAuth, hasAccess(0), addUser);
router.post(
    "/submitAss/:courseCode/:assNo",
    isAuth,
    hasAccess(2),
    upload({}, { fileTypes: ["pdf"] }),
    submitAss
);
router.delete("/delUser/:id", isAuth, hasAccess(0), delUser);

module.exports = router;
