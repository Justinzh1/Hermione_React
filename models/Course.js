
var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    professors: [{ name: String }],
    videos: [{
        title: String,
        id: Number,
        url: String,
        date: Date,
        timestamps: [{ time: Number, topic: String }],
        length: Number
    }],
    code: String,
    year: String,
    students: Number,
    week: Number,
    start: Date
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;