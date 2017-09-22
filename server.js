const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const config = require('./config')
const User = require('./models/user')


const bcrypt = require('bcrypt')
const saltRounds = 10

const userAPI = require('./api/user')
const subscriptionAPI = require('./api/subscription')
const updateAPI = require('./api/update')
const episodeAPI = require('./api/episode')
const eventLogAPI = require('./api/event')
const showAPI = require('./api/show')

mongoose.Promise = global.Promise
mongoose.connect(config.database, {useMongoClient: true})

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('serverKey', config.server_secret)

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

app.post('/sign-up', (req, res) => userAPI.createUser(req, res))
app.post('/sign-in', (req, res) => userAPI.authenticateUser(req, res))

app.get('/users', userAPI.verifyUser, (req, res) => userAPI.getUsers(req, res))
app.put('/profile', userAPI.verifyUser, (req, res) => userAPI.updateProfile(req, res))
app.get('/profile', userAPI.verifyUser, (req, res) => userAPI.getUserProfilePageInfo(req, res))
// app.get('/user', (req, res) => userAPI.getUser(req, res))
app.post('/subscribe', userAPI.verifyUser, (req, res) => subscriptionAPI.subscribe(req, res))
app.get('/update', userAPI.verifyUser, (req, res) => updateAPI.getUpdates(req, res))
app.put('/episode', userAPI.verifyUser, (req, res) => episodeAPI.markEpisodeAsWatched(req, res))
app.post('/event', userAPI.verifyUser, (req, res) => eventLogAPI.LogEvent(req, res))
app.post('/favorite', userAPI.verifyUser, (req, res) => showAPI.favorite(req, res))
app.get('/favorites', userAPI.verifyUser, (req, res) => userAPI.getFavorites(req, res))


app.listen(process.env.PORT || 3001, () => {
	console.log(`Started on ${process.env.PORT || 3001}`)
})
