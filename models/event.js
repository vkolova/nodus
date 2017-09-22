var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('ShowEvent', new Schema({
  userId: String,
  showId: String,
  event: String,
  timestamp: { type: Date, default: Date.now }
}))
