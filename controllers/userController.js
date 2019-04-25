const express = require('express');
const router = express.Router();
const Project = require('../models/projects.js');
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

// NEW ROUTE
router.get('/new', (req, res) => {
	// render new user 
	res.render('users/new.ejs')
});

// INDEX ROUTE
router.get('/', (req, res) => {
	
});

// SHOW ROUTE
router.get('/:id', (req, res) => {

});

// CREATE ROUTE
router.post('/', async (req, res) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const userDbEntry = {};
	userDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash;
	userDbEntry.firstName = req.body.firstName;
	userDbEntry.lastName = req.body.lastName;
	userDbEntry.location = req.body.location;
	userDbEntry.email = req.body.email;
	userDbEntry.description = req.body.description;
	userDbEntry.imageURL = req.body.imageURL;

	try {

	} catch(err) {
		res.send(err)
	}

});

// EDIT ROUTE 
router.get('/:id/edit', (req, res) => {

});

// UPDATE ROUTE
router.put('/:id', (req, res) => {

});

// DESTROY ROUTE
router.delete('/:id', (req, res) => {

});








module.exports = router;