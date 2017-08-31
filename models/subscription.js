var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('Subscription', new Schema({
    user: String,
    show: String,
    timestamp: { type: Date, default: Date.now }
}))
