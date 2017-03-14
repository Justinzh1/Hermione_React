var async = require('async');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var User = require('../models/User');
var Course = require('../models/Course');
var User = require('../models/User');

/**
 ** Course Schema
 **
    title: String,
    description: String,
    professors: [{} name: String }],
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
*/

/**
 * GET /courses
 * Returns list of classes user is enrolled in
 */

 exports.getClasses = function(req, res, next) {
 	if(req.courses) {
 		var courseData = Object.keys(req.courses);
	 	var courseList = courseData.map((c) => (courseData[c]).code);
	 	Course.find(
	 		{ $all: courseList },
	 		function(err, courses) {
	 			if (courses) {
	 				res.send({courses: courses});
	 			}
	 		}
	 	});
 	}
 }


/** 
 * POST /class
 * Creates a new class
 */

exports.createClass = function(req, res, next) {
	if (req.user.professor) {
		Course.findOne(
			{ $or: [
				{ title: req.body.title, year: req.body.year },
				{ code: req.body.code }
			]}, 
			function(err, course) {
			    if (course) {
			    	return res.status(400).send({ msg: 'The class you are trying to correct already exists.' });
			    }
			    course = new Course({
					title: req.body.title,
					description: req.body.description,
					professors: req.body.professors,
					videos: [],
					code: req.body.code,
					year: req.body.year,
					students: 0,
					week: 1,
					start: req.body.date
			    });
			    course.save(function(err) {
			    	res.send({course: course});
			    });
	  		});
	} else {
		return res.status(400).send({ msg: 'You are not authorized to do this.' });
	}
}

/** 
 * POST /enroll
 * Enrolls in a Class
 */

 exports.enrollInCourse = function(req, res, next) {
 	Course.findOne({ code: req.body.code }, function(err, course) {
 		User.findOneAndUpdate(
 			{ _id: req.body._id},
 			{ $push: {
 				enrolled: {
 					{ code: req.body.code }
 				}
 			}},
 			{upsert: true, returnNewDocument: true}
 		);
 	});
 }

/** 
 * POST /video
 * Adds a new video to a class
 */

exports.addVideo = function(req, res, next) {
	if (req.user.professor) {
		Course.findOneAndUpdate(
			{ title: req.body.title, year: req.body.year },
			{ $push: {
				videos : {
					title: req.body.video.title,
					id: req.body.video.id,
					date: req.body.video.date,
					url: req.body.video.url,
					timestamps: [],
					length: req.body.video.length
			 	}
			}},
			{upsert: true, returnNewDocument: true}
		);
	} else {
		return res.status(400).send({ msg: 'You are not authorized to do this.' });
	}
}

/**
 * DELETE /video
 * Deletes a video from a class
 */

exports.videoDelete = function(req, res, next) {
	if (req.user.professor) {
		Course.findOneAndUpdate(
			{ title: req.body.title, year: req.body.year },
			{ $pull: {
				videos: {
					title: req.body.video.title,
					id: req.body.video.id,
				}
			}},
			{ multi: false }
		}}
	} else {
		return res.status(400).send({ msg: 'You are not authorized to do this.' });
	}
};

/**
 * DELETE /class
 * Deletes a class
 */
