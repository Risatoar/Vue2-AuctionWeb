var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
	"username": String,
	"pwd": String,
	"nickname": String,
	"icon": String,
	"age": String,
	"truename": String,
	"company": String,
	"telephone": String,
	"mail": String,
	"usercreatedate": String,
	"admin": {
		type: Boolean,
		default: false
	},
	"auctionnews": {
		type: Array,
		default: []
	},
	"previews": {
		type: Array,
		default: []
	}
})

module.exports = mongoose.model("users", userSchema)