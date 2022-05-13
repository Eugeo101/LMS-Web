const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    department: String,
    type: { type: Number, enum: [0, 1, 2] }, // Admin, Instructor, Strudent
    info: {},
});

module.exports = model("User", userSchema);
/*
Info :
    Admin : 
    Instructor :
        courses
        rank
    Students :
        group #
        section #
        GPA
        courses :
            id 
            Status ://0:pending, 1:registered, 2:finished
            grade
            deliveries : [
                {
                    assNo,
                    file
                }
            ]     
*/
