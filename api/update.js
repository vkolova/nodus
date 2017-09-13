const TorrentSearchApi = require('torrent-search-api');

const Subscription = require('../models/subscription')
const User = require('../models/user')


const getUpdates = (req, res) => {
	console.log('getUpdates called')
	const torrentSearch = new TorrentSearchApi()
	torrentSearch.enableProvider('Torrent9')

	torrentSearch.search('Teen Wolf', 'TV', 5)
		.then(torrents => {
			res.json(torrents)
		})
		.catch(err => {
			console.log(err)
			res.json(err)
		});
}


module.exports = {
	getUpdates
}
