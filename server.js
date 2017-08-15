const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const config = require('./config')
const User = require('./models/user')

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

app.set('superSecret', config.secret) // secret variable

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/sign-in', (req, res) => {
  	// find the user
  	User.findOne({
  		email: req.body.email
  	}, (err, user) => {

  		if (err) throw err

  		if (!user) {
  			return res.status(401).json({ message: 'Authentication failed. Incorrect user or password.' })
  		} else if (user) {

  			// check if password matches
  			if (user.password != req.body.password) {
  				return res.status(401).json({ message: 'Authentication failed. Incorrect user or password.' })
  			} else {
  				// if user is found and password is right
  				// create a token
  				const token = jwt.sign({user: user.username, password: user.password}, app.get('superSecret'), {
  					expiresIn : 60*60*24 // expires in 24 hours
  				})

  				// return the information including token as JSON
  				res.status(200).json({
  					token: token
  				})
  			}
  		}
  	})
})

app.post('/sign-up', (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		admin: false
	})

	// save the  user
	user.save(err => {
		if (err) throw err
		res.json({ success: true })
	})
})


app.get('/sign-up', (req, res) => {
	const user = new User({
		username: '',
		password: '',
		email: '',
		admin: true
	})

	user.save(err => {
		if (err) throw err
		res.json({ success: true })
	})
})

app.get('/users', (req, res) => {
	User.find({}, (err, users) => {
		res.json(users)
	})
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Started on ${process.env.PORT || 3000}`)
})
