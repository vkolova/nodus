const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
// const jwt = require('jsonwebtoken')
// const User = require('./models/user')
// const bcrypt = require('bcrypt')

// const saltRounds = 10
const userAPI = require('./api/user')
const subscriptionAPI = require('./api/subscription')
const updateAPI = require('./api/update')
const episodeAPI = require('./api/episode')
const eventLogAPI = require('./api/event')
const showAPI = require('./api/show')

mongoose.Promise = global.Promise
mongoose.connect(config.database, { useMongoClient: true })

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('serverKey', config.server_secret)

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

app.post('/sign-up', userAPI.createUser)
app.post('/sign-in', userAPI.authenticateUser)

app.get('/users', userAPI.verifyUser, userAPI.getUsers)
app.put('/profile', userAPI.verifyUser, userAPI.updateProfile)
app.get('/profile', userAPI.verifyUser, userAPI.getUserProfilePageInfo)
// app.get('/user', (req, res) => userAPI.getUser(req, res))
app.post('/subscribe', userAPI.verifyUser, subscriptionAPI.subscribe)
app.get('/update', userAPI.verifyUser, updateAPI.getUpdates)
app.put('/episode', userAPI.verifyUser, episodeAPI.markEpisodeAsWatched)
app.post('/event', userAPI.verifyUser, eventLogAPI.LogEvent)
app.post('/favorite', userAPI.verifyUser, showAPI.favorite)
app.get('/favorites', userAPI.verifyUser, userAPI.getFavorites)


app.listen(process.env.PORT || 3001, () => {
	console.log(`Started on ${process.env.PORT || 3001}`)
})
