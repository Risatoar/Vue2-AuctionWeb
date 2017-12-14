var mongoose = require("mongoose")
var Schema = mongoose.Schema
var sd = require("silly-datetime");

let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm')

var userSchema = new Schema({
	"username": String,
	"pwd": String,
	"newusername": String,
	"newpwd": String,
	"usercreatedate": String,
	"admin": {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model("users", userSchema)