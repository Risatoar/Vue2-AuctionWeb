var mongoose = require("mongoose")
var Schema = mongoose.Schema

var previewSchema = new Schema({
	"title": String,
	"description": String,
	"author": String,
	"maintext": String,
	"image": {
		type: String,
		default: "mi6.jpg"
	},
	startdate: String,
	finaldate: String,
	finaltime: String,
	"watch": [
		{
			"watcher": String,
			"watchdate": String
		}
	],
	"watchcount": String,
	"date": String
})

module.exports = mongoose.model("previews", previewSchema)