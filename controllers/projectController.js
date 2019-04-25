const express = require('express');
const router = express.Router();
const Project = require('../models/projects.js');
const User = require('../models/users.js');


// NEW ROUTE
router.get('/new', (req, res) => {
	res.render('projects/new.ejs')
});

// CREATE ROUTE
router.post('/', async (req, res) => {
	// create new project and redirect to the user that 
	// owns the project 


	try {
		const createdProject = await Project.create(req.body);
		user.findById(req.body.projectId)
		res.redirect('/users/')

	} catch(err) {


	}
})

// SHOW ROUTE


// EDIT ROUTE


// UPDATE ROUTE



















module.exports = router;