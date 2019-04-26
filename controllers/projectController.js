const express = require('express');
const router = express.Router();
const Project = require('../models/projects.js');
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');


// NEW ROUTE
router.get('/new', (req, res) => {
	console.log(req.session);

	res.render('projects/new.ejs')
});

// CREATE ROUTE
router.post('/', async (req, res, next) => {
	// use session id to find user
	// create project
	// push into user.projects
	// save
	try {
		const createdProject = await Project.create(req.body);
		const foundUser = await User.findById(req.session.usersDbId)
		console.log('found user ========> ' + foundUser);
		foundUser.projects.push(createdProject)
		foundUser.save((err, savedUser) => {
			console.log('===> ' + savedUser);
		res.render('users/show.ejs', {
			user: foundUser,
			message: '',
			new: true
		})

		})

	} catch(err) {
		next(err)
	}
})

// SHOW ROUTE


// EDIT ROUTE


// UPDATE ROUTE



















module.exports = router;