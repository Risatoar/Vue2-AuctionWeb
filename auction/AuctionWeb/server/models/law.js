var mongoose = require("mongoose")
var Schema = mongoose.Schema

var lawSchema = new Schema({
	"title": String,
	"description": String,
	"author": String,
	"maintext": String,
	"covermap": String,
	"stars": {
		type: Number,
		default: 0.0
	},
	"watch": [
		{
			"watcher": String,
			"watchdate": String
		}
	],
	"date": String
})

module.exports = mongoose.model("law", lawSchema)