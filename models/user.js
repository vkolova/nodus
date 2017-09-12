var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
	email: { type: String, unique : true },
	password: String,
	username: { type: String, unique : true },
	avatar: { type: String, default: '' },
	admin: { type: Boolean, default: false },
	joined: { type: Date, default: Date.now }
}))
