const mongoose = require('mongoose');
const Project = require('./projects');

const userSchema = new mongoose.Schema({
	userName: {type: String, required: true, unique: true},
	password: {type: String, required: true}, 
	firstName: {type: String, required: true}, 
	lastName: {type: String, required: true}, 
	email: {type: String, required: true}, 
	location: String,
	imageURL: String, 
	description: String,
	projects: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Project'
	}]
})


const User = mongoose.model('User', userSchema)

module.exports = User;