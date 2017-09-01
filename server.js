const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const config = require('./config')
const User = require('./models/user')


const bcrypt = require('bcrypt')
const saltRounds = 10


const userAPI = require('./api/user')

mongoose.Promise = global.Promise
mongoose.connect(config.database, {useMongoClient: true})

const app = express()
// const server = require('http').Server(app)
// const io = require('socket.io')(server)
//
// server.listen(80)
//
// io.on('connection', function (socket) {
//     socket.send('hi')
// })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('serverKey', config.server_secret)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/sign-up', (req, res) => userAPI.createUser(req, res))
app.post('/sign-in', (req, res) => userAPI.authenticateUser(req, res))
app.get('/users', (req, res) => userAPI.getUsers(req, res))
app.put('/profile', (req, res) => userAPI.updateProfile(req, res))
// app.get('/user', (req, res) => userAPI.getUser(req, res))

app.listen(process.env.PORT || 3001, () => {
	console.log(`Started on ${process.env.PORT || 3001}`)
})
