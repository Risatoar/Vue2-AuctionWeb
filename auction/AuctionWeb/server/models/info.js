var mongoose = require("mongoose")
var Schema = mongoose.Schema

var infoSchema = new Schema({
	"title": String,
	"description": String,
	"author": String,
	"maintext": String,
	"covermap": String,
	"stars": {
		type: Number,
		default: 0.0
	},
	"isChecked": {
		type: Boolean,
		default: false
	},
	"watch": [
		{
			"watcher": String,
			"watchdate": String
		}
	],
	"watchcount": String,
	"date": String,
})

module.exports = mongoose.model("infos", infoSchema)