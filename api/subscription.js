const Subscription = require('../models/subscription')
const User = require('../models/user')


const subscribe = (req, res) => {
	User.findOne({
  		email: req.user.email
  	}, (err, user) => {
  		if (err) throw err
		const subscription = new Subscription({
			userId: user._id,
		    showName: req.body.showName,
			showId: req.body.showId,
			season: req.body.notWatched ? 0 : req.body.season,
			episode: req.body.notWatched ? 0 : req.body.episode
		})

		subscription.save(err => {
			if (err) throw err
	        res.status(200).json({
	            success: true,
				show: subscription.show
	        })
		})
  	})
}

module.exports = {
    subscribe
}
