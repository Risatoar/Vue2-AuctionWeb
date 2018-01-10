var mongoose = require("mongoose")
var Schema = mongoose.Schema

var infoSchema = new Schema({
	"title": String,
	"description": String,
	"author": String,
	"maintext": String,
	"stars": {
		type: Number,
		default: 0.0
	},
	"date": String
})

module.exports = mongoose.model("infos", infoSchema)