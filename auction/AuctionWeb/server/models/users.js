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
	"truename": {
		type: String,
		default: ''
	},
	"company": String,
	"telephone": String,
	"mail": String,
	"usercreatedate": String,
	"reason" : String,
	"admin": {
		type: Boolean,
		default: false
	},
	"idCard1": {
		type: String,
		default: ''
	},
	"idCard2": {
		type: String,
		default: ''
	},
	"isChecked": {
		type: Boolean,
		default: false
	},
	"isReal": {
		type: Boolean,
		default: false
	},
	"isBan": {
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