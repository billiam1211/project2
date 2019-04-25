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
	res.send('index page goes here!')
});

// SHOW ROUTE
router.get('/:id', async (req, res) => {

	User.findById(req.params.id)
		.populate('projects')
		.exec((err, foundUser) => {
			console.log(foundUser);
			res.render('users/show.ejs', {
				user: foundUser
		})
	})

});

// CREATE ROUTE
router.post('/', async (req, res) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const userDbEntry = {};
	userDbEntry.userName = req.body.userName;
	userDbEntry.password = passwordHash;
	userDbEntry.firstName = req.body.firstName;
	userDbEntry.lastName = req.body.lastName;
	userDbEntry.location = req.body.location;
	userDbEntry.email = req.body.email;
	userDbEntry.description = req.body.description;
	userDbEntry.imageURL = req.body.imageURL;

	try {

		const createdUser = await User.create(userDbEntry);
		req.session.logged = true;
		req.session.userDbId = createdUser._id;
		console.log(createdUser);

		res.redirect(`/users/${createdUser._id}`)
	} catch(err) {
		res.send(err)
	}

});


// EDIT ROUTE 
router.get('/:id/edit', (req, res) => {
	res.send('edit route here')
});

// UPDATE ROUTE
router.put('/:id', (req, res) => {

});

// DESTROY ROUTE
router.delete('/:id', (req, res) => {

});








module.exports = router;