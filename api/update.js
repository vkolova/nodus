// const TorrentSearchApi = require('torrent-search-api')
const TPB = require('tpb-api');
const tpb = new TPB();

const Subscription = require('../models/subscription')
const User = require('../models/user')

const getSearchQuery = s =>
	`${s.showName} S${s.seaso*1 + 1 > 9 ? s.season*1 + 1 : '0' + s.season}E${s.episode*1 + 1 > 9 ? s.episode*1 + 1 : '0' + s.episode}`

const getSearch = s =>
	tpb.search(getSearchQuery(s))
		.then(torrents => {
      console.log(torrents);
      return torrents;
    })
		.catch(err => console.log(err))

const getUpdates = (req, res) => {
	User.findOne({ 'email': req.user.email })
		.exec((err, user) => {
			if (err) throw err

			Subscription.find({})
				.where('userId').equals(user._id)
				.exec(async (err, subs) => {
					if (err) throw err

					const data = await Promise.all(subs.map(getSearch))
					res.json(...data)
				})
		})
}

module.exports = {
	getUpdates
}
