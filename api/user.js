const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const config = require('../config')

const saltRounds = 10

const createToken = ({user, password}) =>
    jwt.sign(
        {user, password},
        config.server_secret,
        { expiresIn : 60*60*24*30 }
    )

const createUser = (req, res) => {
	const user = new User({
		username: req.body.username,
        password: bcrypt.hashSync(req.body.password, saltRounds),
		email: req.body.email,
		admin: false
	})

	user.save(err => {
		if (err) throw err
        res.status(200).json({
            success: true,
            token: createToken({ user: user.username, password: user.password}),
            username: user.username,
            joined: user.joined
        })
	})
}

const getUsers = (req, res) => {
	User.find({}, (err, users) => {
		res.json(users)
	})
}

const verifyUser = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, config.server_secret, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        })
    }
}

const authenticateUser = (req, res) => {
  	User.findOne({
  		email: req.body.email
  	}, (err, user) => {
  		if (err) throw err

  		if (!user) {
  			return res.status(401).json({
                    message: 'Authentication failed. Incorrect user or password.'
                })
  		} else if (user) {
  			// check if password matches
            if (!bcrypt.compareSync(req.body.password, user.password)) {
  				return res.status(401).json({
                        message: 'Authentication failed. Incorrect user or password.'
                    })
  			} else {
  				// if user is found and password is right
  				const token = createToken({ user: user.username, password: user.password})
  				res.json({
  					token: token,
                    username: user.username,
                    joined: user.joined
  				})
  			}
  		}
  	})
}


module.exports = {
    createUser,
    getUsers,
    verifyUser,
    authenticateUser
}
