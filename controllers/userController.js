const express = require('express');
const router = express.Router();
const Project = require('../models/projects.js');
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');




// NEW ROUTE
router.get('/new', (req, res) => {
	// render new user 
	res.render('users/new.ejs', {
		message: req.session.message
	});
});

// INDEX ROUTE
router.get('/', async (req, res) => {
	try {
		const foundUsers = await User.find({})
		res.render('users/index.ejs', {
			users: foundUsers
		})
	} catch(err) {
		res.send(err)
	}
});

// SHOW ROUTE
router.get('/:id', async (req, res) => { console.log("hey");
	// need to add projects to .populate()
	User.findById(req.params.id)
		.populate('projects')
		.exec((err, foundUser) => {
			console.log("\nhere is foundUser----is this happening twice?");
			console.log(foundUser);
			res.render('users/show.ejs', {
				user: foundUser,
				message: req.session.message
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
		if(createdUser){
			req.session.logged = true;
			req.session.userDbId = createdUser._id;
			console.log(createdUser);
			req.session.message = "Account Created. Thank you!"
			res.redirect(`/users/${createdUser._id}`)
		} else {
			req.session.message = "A required field is incomplete"
		}
	} catch(err) {
		res.send(err)
	}

});


// EDIT ROUTE 
router.get('/:id/edit', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		res.render('users/edit.ejs', {
			user: foundUser
		})
		console.log(foundUser);
	} catch(err) {
		res.send(err)
	}
});

// UPDATE ROUTE
router.put('/:id', async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.redirect(`/users/${req.params.id}`)
	} catch(err) {
		res.redirect(`/users/${req.params.id}/edit`)
	}
});

// DESTROY ROUTE
router.delete('/:id', async (req, res) => {
	// need to add Projects.deleteMany()
	try {
		const deletedUser = await User.findByIdAndRemove(req.params.id);
		Project.deleteMany({
				_id: {
					$in: deletedUser.projects
				}
			})
		res.redirect('/');
	} catch (err) {
		res.send(err)
	}
});





module.exports = router;