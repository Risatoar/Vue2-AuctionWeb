var mongoose = require("mongoose")
var Schema = mongoose.Schema

var auctionSchema = new Schema({
	"acTitle": String,
	"acTime": String
})

module.exports = mongoose.model("news", auctionSchema)