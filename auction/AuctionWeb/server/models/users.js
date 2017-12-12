var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
	"username": String,
	"pwd": String,
	"newusername": String,
	"newpwd": String,
	"usercreatedate": Date
})

module.exports = mongoose.model("users", userSchema)