var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
	email: String,
	password: String,
	username: String,
    avatar: { type: String, default: '' },
	admin: { type: Boolean, default: false },
    joined: { type: Date, default: Date.now }
}))
