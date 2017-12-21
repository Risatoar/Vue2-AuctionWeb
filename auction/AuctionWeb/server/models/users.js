var mongoose = require("mongoose")
var Schema = mongoose.Schema

var userSchema = new Schema({
	"username": String,
	"pwd": String,
	"nickname": {
		type: String,
		default: 'no'
	},
	"icon": {
		type: String,
		default: 'no'
	},
	"age": {
		type: String,
		default: 'no'
	},
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