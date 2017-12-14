var mongoose = require("mongoose")
var Schema = mongoose.Schema

var infoSchema = new Schema({
	"title": String,
	"description": String,
	"author": String,
	"date": String
})

module.exports = mongoose.model("infos", infoSchema)