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
            const token = jwt.sign({ ...user._doc }, process.env.JWT_SECRET);
            res.json(token);
        } else next({ errorCode: "PASSWORD_INCORRECT", statusCode: 400 });
    } else next({ errorCode: "ACCOUNT_DOES_NOT_EXIST", statusCode: 400 });
};

exports.getToken = async (req, res, next) =>{
    const {id} = req.body;
    const user = await User.findById({_id: id});
    user.password = undefined;
    const token = jwt.sign({ ...user._doc }, process.env.JWT_SECRET);
    res.json(token);
};

//magdi
exports.getUsers = async (req, res, next) => {
    const type = req.params.type;
    try{
        const users = await User.find({ type: type }).exec();
        res.status(200).json(users);
    } catch(err){
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.addUser = async (req, res, next) => {
    const { password } = req.body;
    const hashedPass = await hash(password, 12);
    req.body.email = req.body.id + "@eng.asu.edu.eg";
    req.body.password = hashedPass;
    const user = new User(req.body);
    try {
        const userExists = await User.find({ id: req.body.id }).exec();
        if (userExists.length)
            next({ statusCode: 400, errorCode: "ACCOUNT_EXISTS" });
        else {
            const createdUser = await user.save();
            const users = await User.find({type: createdUser.type}).exec();
            createdUser.password = undefined;
            createdUser.__v = undefined;
            res.status(200).json(users);
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
        const users = await User.find({ type: user.type });
        res.status(200).json(users);
        
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
    const courseId = req.params.courseId;
    // const file = req.file;
    const file = req.body.file;
    try {
        const user = await User.findById(id).exec();
        if (!user)
            next({ statusCode: 404, errorCode: "ACCOUNT_DOES_NOT_EXIST" });
        else {
            const i = user.info.courses.findIndex((c) => c.id.toString() == courseId);
            user.info.courses[i].deliveries.push({ assNo, file }); //deliveries
            await User.findByIdAndUpdate(id, { info: user.info });
            res.status(200).json({ msg: "Assignment submitted" });
        }
    } catch (err) {
        console.log(err);
        const errorCode = "INVALID_ID" ;
        const statusCode = 400;
        next({ statusCode, errorCode });
    }
};

