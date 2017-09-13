const Subscription = require('../models/subscription')
const User = require('../models/user')

const config = require('../config')

const subscribe = (req, res) => {
	User.findOne({
  		email: req.user.email
  	}, (err, user) => {
  		if (err) throw err
		const subscription = new Subscription({
			user: user._id,
		    show: req.body.show,
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
