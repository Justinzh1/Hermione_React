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
 * GET /getUserClasses
 * Returns list of classes user is enrolled in
 */

 exports.getUserClasses = function(req, res, next) {
 	var courses = req.query.courses.split(',');
 	if (courses) {
	 	Course.find(
	 		{ code: { $in: courses }},
	 		function(err, courses) {
	 			if (courses) {
	 				res.send({courses: courses});
	 			}
	 		}
	 	);
 	} else {
 		console.log("No courses found");
 	}
 }


/** 
 * POST /createClass
 * Creates a new class
 */

exports.createClass = function(req, res, next) {
	Course.findOne(
		{ $or: [
			{ title: req.body.title, year: req.body.year }
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
}

/** 
 * POST /enroll
 * Enrolls in a Class
 */

 exports.enrollInClass = function(req, res, next) {
 	console.log("enrollInClassCTRL " + JSON.stringify(req.body));
 	Course.findOne({ code: req.body.code }, function(err, course) {
 		if (err) {
 			res.send(404);
 			return;
 		}

 		course.students += 1;
 		course.save();

 		User.findOne({ _id: req.body.user._id}, function(err, user) {

	 		if (!user.enrolled) {
	 			user.enrolled = [];
	 		}
	 		user.enrolled.push(req.body.code);
	 		user.save();
 		});

 		res.send(200)
 	});
 }

/** 
 * POST /video
 * Adds a new video to a class
 */

exports.createVideo = function(req, res, next) {
	Course.findOne(
		{ title: req.body.title, year: req.body.year }, function(err, course) {
			if (err) {
				res.send(404);
				return;
			}
			course.videos.push({
				title: req.body.video.title,
				id: req.body.video.id,
				date: req.body.video.date,
				url: req.body.video.url,
				timestamps: [],
				length: req.body.video.length
			});
			course.save(function(err) {
				if (err) throw err;
				res.send({message: "Controller Succesfully added video."});
			});
		});
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
		);
	} else {
		return res.status(400).send({ msg: 'You are not authorized to do this.' });
	}
};

/**
 * DELETE /class
 * Deletes a class
 */
