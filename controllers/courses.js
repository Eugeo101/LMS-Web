const Course = require("../models/courses");
const User = require("../models/users");

exports.getOne = async (req, res, next) => {
    const id = req.params.id;
    const course = await Course.findById(id).exec();
    if (course) {
        res.status(200).json(course);
    } else next({ errorCode: "COURSE_NOT_FOUND", statusCode: 404 });
};

exports.getAll = async (req, res, next) => {
    try {
        const courses = await Course.find().exec();
        res.status(200).json(courses);
    } catch (err) {
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.approve = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).exec();
        if (user) {
            user.info.courses.forEach((v, i, arr) => {
                if (arr[i].status == 0) arr[i].status = 1;
            });
        } else next({ errorCode: "USER_NOT_FOUND", statusCode: 404 });
    } catch (err) {
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.addAss = async (req, res, next) => {
    const { desc, deadline } = req.body;
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId).exec();
        if (course) {
            course.assignments.push({ desc, deadline });
            await course.save();
            res.status(200).json({ msg: "Course added" });
        } else next({ errorCode: "COURSE_NOT_FOUND", statusCode: 404 });
    } catch (err) {
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.addCourse = async (req, res, next) => {
    const { code, title, desc, CH } = req.body;
    try {
        const course = new Course({
            code,
            title,
            desc,
            CH,
            assignments: [],
            material: [],
        });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.addMaterial = async (req, res, next) => {
    const id = req.params.id;
    const file = req.file;
    const course = await Course.findById(id).exec();
    if (course) {
        course.material.push(file);
        await course.save();
        res.status(201).json({ msg: "Material added" });
    } else next({ errorCode: "COURSE_NOT_FOUND", statusCode: 404 });
};
exports.register = async (req, res, next) => {
    const { courseId, userId } = req.params;
    const user = await User.findById(userId).exec();
    const course = await User.findById(courseId).exec();
    if (user && course) {
        user.info.courses.push({
            id: course._id,
            status: 0,
            grade: 0,
            deliveries: [],
        });
        await user.save();
        res.status(200).json({ msg: "Course registered" });
    } else next({ errorCode: "USER_OR_COURSE_NOT_FOUND", statusCode: 404 });
};
exports.assignCourse = async (req, res, next) => {
    const { instructorId, courseId } = req.params;
    const user = await User.findById(instructorId).exec();
    if (user) {
        user.info.courses.push(courseId);
        await user.save();
        res.status(200).json({ msg: "Course assigned" });
    } else next({ errorCode: "USER_OR_COURSE_NOT_FOUND", statusCode: 404 });
};
