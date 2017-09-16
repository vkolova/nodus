var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('WatchedEpisode', new Schema({
	userId: String,
  episodeId: String,
	dateWatched: { type: Date, default: null }
}))
