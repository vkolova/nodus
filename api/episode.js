const WatchedEpisode = require('../models/episode')
const User = require('../models/user')

const markEpisodeAsWatched = (req, res) => {
  User.findOne({
    email: req.user.email
  }, (err, user) => {
    if (err) throw err

    const episode = new WatchedEpisode({
      userId: user._id,
      showId: req.body.show,
      episodeId: req.body.episode,
      dateWatched: req.body.date
    })

    episode.save(err => {
      if (err) throw err
      res.status(200).json({
        success: true
      })
    })
  })
}

module.exports = {
	markEpisodeAsWatched
}
