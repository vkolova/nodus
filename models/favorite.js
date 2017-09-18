var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('Favorite', new Schema({
  userId: String,
  showId: String,
  timestamp: { type: Date, default: Date.now }
}))
