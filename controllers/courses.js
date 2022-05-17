const { updateMany } = require("../models/courses");
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
    const {ids} = req.query;
    try {
        const courses = await Course.find(ids?{_id:{$in : ids}}:{}).exec();
        res.status(200).json(courses);
    } catch (err) {
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.approve = async (req, res, next) => {
    console.log('25');
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).exec();
        if (user) {
            user.info.courses.forEach((v, i) => {
                if (user.info.courses[i].status == 0) user.info.courses[i].status = 1;
            });
            await User.findByIdAndUpdate(userId, {info: user.info})
            res.status(201).json({courses:user.info.courses});
        } else next({ errorCode: "USER_NOT_FOUND", statusCode: 404 });
    } catch (err) {
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.addAss = async (req, res, next) => {
    const assignment = req.body.assignments[0];
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId).exec();
        if (course) {
            if(assignment.title && assignment.desc && assignment.deadline){
                course.assignments.push(assignment);
                await course.save();
            }
            res.status(201).json(course);
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
        const courses = await Course.find().exec();
        res.status(200).json(courses);
    } catch (err) {
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

//delete course
exports.deleteCourse = async (req, res ,next) =>{
    const _id  = req.params.id;
    try{
        const course = await Course.findByIdAndDelete(_id);
        const courses = await Course.find({});
        const users = await User.find({type:{$ne:0}});
        users.forEach(async user=>{
            if(user.type == 1){
                const index = user.info.courses.indexOf(_id) //
                user.info.courses.splice(index,1);
                await User.findByIdAndUpdate(user._id.toString(), {info:user.info})
            }else{
                user.info.courses.forEach((c, i)=>{
                    if(c.id.toString() == _id){
                        user.info.courses.splice(i, 1);
                    }
                })
                await User.findByIdAndUpdate(user._id.toString(), {info:user.info})
            }
        })
        res.status(200).json(courses);
    }
    catch(err){
        console.log(err);
        next({ errorCode: "DATABASE_ERROR" });
    }
};

exports.addMaterial = async (req, res, next) => {
    const id = req.params.id;
    const file = req.body.materials[0]; //materials /*obj = {'materials': [ST]}*/
    const course = await Course.findById(id).exec();
    if (course) {
        if(file){
            course.material.push(file);
            await course.save();
        }
        res.status(201).json(course );
    } else next({ errorCode: "COURSE_NOT_FOUND", statusCode: 404 });
};
exports.register = async (req, res, next) => {
    const { userId, courseId } = req.params;
    const user = await User.findById(userId).exec();
    const course = await Course.findById(courseId).exec();
    if (user && course) {
        user.info.courses.push({
            id: course._id,
            status: 0,
            grade: 0,
            deliveries: [],
        });
        const info = user.info;
        await User.findByIdAndUpdate(userId, {info: user.info})
        res.status(200).json(user.info.courses);
    } else next({ errorCode: "USER_OR_COURSE_NOT_FOUND", statusCode: 404 });
};
exports.assignCourse = async (req, res, next) => {
    const { courseId } = req.params;
    const instructors = req.body.users; 
    const users = await User.find( {_id: { $in: instructors}}).exec();
    let newValues = [];
    users.forEach(async (user)=>{
        user.info.courses.push(courseId);
        newValues.push(user.info);
    })
    const result = instructors.map((instructor, i)=>{
        return User.findByIdAndUpdate(instructor, {info: newValues[i]});
    });
    Promise.all(result).then((response)=>{
        res.status(200).json(response);
    });

};

exports.deleteAss = async (req, res, next) => {
    //console.log('156');
    const {id, title} = req.params;
    const course = await Course.findById(id).exec();
    if (course) {
        course.assignments.forEach((ass, i)=>{
            if(ass.title == title) course.assignments.splice(i, 1);
        })
        await course.save();
        res.status(200).json(course);
    } else next({ errorCode: "COURSE_NOT_FOUND", statusCode: 404 });
};

exports.deleteMaterial = async (req, res, next) => {
    //console.log('1696');
    const {id, material} = req.params;
    const course = await Course.findById(id).exec();
    if (course) {
        course.material.forEach((value, i)=>{
            if(value == material) course.material.splice(i, 1);
        })
        await course.save();
        res.status(200).json(course);
    } else next({ errorCode: "COURSE_NOT_FOUND", statusCode: 404 });
};