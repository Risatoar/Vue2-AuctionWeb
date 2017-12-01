var mongoose = require("mongoose")
var Schema = mongoose.Schema

var infoSchema = new Schema({
	"time": String,
	"title": String,
	"msg": String
})

module.exports = mongoose.model("infos", infoSchema)