const router = require("express").Router();

const isAuth = require("../middlewares/isAuthenticated");
const hasAccess = require("../middlewares/hasAccess");
const upload = require("../middlewares/upload");

const {
    addAss,
    approve,
    getAll,
    getOne,
    addCourse,
    addMaterial,
    register,
    assignCourse,
} = require("../controllers/courses");

router.get("/get/:id", getOne);
router.get("/getAll/:id", getAll);
router.get("/approve/:id", isAuth, hasAccess(0), approve);
router.post("/addAss/:id", isAuth, hasAccess(1), addAss);
router.post("/add", isAuth, hasAccess(0), addCourse);
router.post(
    "/addMaterial",
    isAuth,
    hasAccess(1),
    upload({}, { fileTypes: ["pdf"] }),
    addMaterial
);
router.get("/register/:userId/:courseId", isAuth, hasAccess(2), register);
router.get(
    "assignCourse/:instructorId/:courseId",
    isAuth,
    hasAccess(0),
    assignCourse
);

module.exports = router;
