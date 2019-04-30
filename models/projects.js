const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: String,
	projectURL: {type: String, required: true},
	repo: String,
	projectImage: String,
})



const Project = mongoose.model('Project', projectSchema)

module.exports = Project