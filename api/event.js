const WatchedEpisode = require('../models/episode')
const ShowEvent = require('../models/event')

const LogEvent = (req, res) => {
  User.findOne({
    email: req.user.email
  }, (err, user) => {
    if (err) throw err

    const event = new ShowEvent({
      userId: user._id,
      showId: req.body.episode,
      event: req.body.event
    })

    eevent.save(err => {
      if (err) throw err
      res.status(200).json({
        success: true
      })
    })
  })
}

module.exports = {
	LogEvent
}
