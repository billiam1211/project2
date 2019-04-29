const express = require('express');
const router = express.Router();
const Project = require('../models/projects.js');
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

// NEW ROUTE
router.get('/new', (req, res) => {
	// console.log(req.session);

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
		// console.log('found user ========> ' + foundUser);
		foundUser.projects.push(createdProject)
		foundUser.save((err, savedUser) => {
			// console.log('===> ' + savedUser);
			// res.render('users/show.ejs', {
			// 	user: foundUser,
			// 	message: '',
			// })
			res.redirect('/users/' + req.session.usersDbId)
		})
	} catch(err) {
		next(err)
	}
});

// SHOW ROUTE
router.get('/:id', async (req, res, next) => {
	try {
		const foundProject = await Project.findById(req.params.id)
		const foundUser = await User.findOne({projects: foundProject})
		console.log(`${foundUser._id} <------------foiundUser`);
		console.log(`${typeof foundUser._id} <------------foundUser`);
		console.log(req.session.usersDbId);
		console.log(typeof req.session.usersDbId);
		res.render('projects/show.ejs', {
			project: foundProject,
			loggedIn: foundUser._id == req.session.usersDbId
		});
	} catch(err) {
		next(err)
	}	
});

// DESTROY
router.delete('/:id', async (req, res, next) => {
	// console.log("delete");
	try {
		const deletedProject = await Project.findByIdAndDelete(req.params.id);
		res.redirect(`/users/${req.session.usersDbId}`)
	} catch(err) {
		next(err)
	}
});

// EDIT ROUTE
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundProject = await Project.findById(req.params.id);
		res.render('projects/edit.ejs', {
			project: foundProject
		})
	} catch(err) {
		next(err)
	}	
});

// UPDATE ROUTE
router.put('/:id', async (req, res, next) => {
	try {
		const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
		res.redirect(`/users/${req.session.usersDbId}`)
	} catch(err) {
		next(err)
	}
});












module.exports = router;