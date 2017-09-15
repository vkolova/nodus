var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('Subscription', new Schema({
    userId: String,
    showId: String,
	showName: String,
	season: String,
	episode: String,
    timestamp: { type: Date, default: Date.now }
}))
