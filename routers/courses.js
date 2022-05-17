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
    deleteCourse,
    addMaterial,
    register,
    assignCourse,
    deleteAss,
    deleteMaterial
} = require("../controllers/courses");

router.get("/get/:id", getOne);
router.get("/getAll", getAll);
router.get("/approve/:id", isAuth, hasAccess(0), approve);
router.post("/addAss/:id", isAuth, hasAccess(1), addAss);
router.post("/add", isAuth, hasAccess(0), addCourse);

// delete 
router.post("/delete/:id", isAuth, hasAccess(0), deleteCourse);
router.post(
    "/addMaterial/:id",
    isAuth,
    hasAccess(1),
    // upload({}, { fileTypes: ["pdf"] }),
    addMaterial
);
router.get("/register/:userId/:courseId", isAuth, hasAccess(2), register);
router.post(
    "/assignCourse/:courseId",
    isAuth,
    hasAccess(0),
    assignCourse
);

router.delete("/delAss/:id/:title",isAuth, hasAccess(1), deleteAss);
router.delete("/delMat/:id/:material", isAuth, hasAccess(1), deleteMaterial);
module.exports = router;
