const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(["-__v"]).exec();
    if (user) {
        const passIsCorret = await compare(password, user.password);
        if (passIsCorret) {
            user.password = undefined;
            const token = jwt.sign({ ...user }, process.env.JWT_SECRET);
            res.json(token);
        } else next({ errorCode: "PASSWORD_INCORRECT", statusCode: 400 });
    } else next({ errorCode: "ACCOUNT_DOES_NOT_EXIST", statusCode: 400 });
};

exports.addUser = async (req, res, next) => {
    const { password } = req.body;
    const hashedPass = await hash(password, 12);
    req.body.password = hashedPass;
    const user = new User(req.body);
    try {
        const userExists = await User.find({ email }).exec();
        if (userExists.length)
            next({ statusCode: 400, errorCode: "ACCOUNT_EXISTS" });
        else {
            const createdUser = await user.save();
            createdUser.password = undefined;
            createdUser.__v = undefined;
            res.status(200).json(createdUser);
        }
    } catch (err) {
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.delUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user._id);
    } catch (err) {
        console.log(err);
        const isInvalidId = err instanceof Error.CastError;
        const errorCode = isInvalidId ? "INVALID_ID" : "DATABASE_ERROR";
        const statusCode = isInvalidId ? 400 : 500;
        next({ statusCode, errorCode });
    }
};

exports.submitAss = async (req, res, next) => {
    const id = req.authorization._id;
    const assNo = req.params.assNo;
    const courseCode = req.params.courseCode;
    const file = req.file;
    try {
        const user = await User.findById(id).exec();
        if (userExists.length)
            next({ statusCode: 404, errorCode: "ACCOUNT_DOES_NOT_EXIST" });
        else {
            const i = user.info.courses.findIndex((c) => c.code == courseCode);
            user.info.courses[i].deliveries.push({ assNo, file });
        }
        await User.findByIdAndUpdate(id, { courses: user.info.courses });
        res.status(200).json({ msg: "Assignment submitted" });
    } catch (err) {
        console.log(err);
        const isInvalidId = err instanceof Error.CastError;
        const errorCode = isInvalidId ? "INVALID_ID" : "DATABASE_ERROR";
        const statusCode = isInvalidId ? 400 : 500;
        next({ statusCode, errorCode });
    }
};
