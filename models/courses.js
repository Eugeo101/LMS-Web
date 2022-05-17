const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    code: String,
    title: String,
    desc: String,
    CH: Number,
    assignments: {type:[{ title:String, desc: String, deadline: String }], _id:false},
    material: [String],
});

module.exports = model("Course", courseSchema);
