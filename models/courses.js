const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
    code: String,
    title: String,
    desc: String,
    CH: Number,
    assignments: [{ desc: String, deadline: String }],
    material: [String],
});

module.exports = model("Course", courseSchema);
