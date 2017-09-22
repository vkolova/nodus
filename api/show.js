const Favorite = require('../models/favorite')
const User = require('../models/user')

const favorite = (req, res) => {
	User.findOne({
		email: req.user.email
	}, (err, user) => {
		if (err) throw err
		const favorite = new Favorite({
      userId: user._id,
      showId: req.body.showId,
		})

		favorite.save(err => {
			if (err) throw err
			res.status(200).json({
				success: true,
			})
		})
	})
}

module.exports = {
	favorite
}
