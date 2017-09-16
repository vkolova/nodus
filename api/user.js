const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const config = require('../config')

const saltRounds = 10

const createToken = ({email, password}) =>
  jwt.sign(
    {email, password},
    config.server_secret,
    { expiresIn : 60*60*24*30 }
  )

const createUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    email: req.body.email
  })

  user.save(err => {
    if (err) throw err
    res.status(200).json({
      success: true,
      token: createToken({ email: user.email, password: user.password}),
      username: user.username,
      avatar: '',
      email: user.email,
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
        req.user = decoded
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
        const token = createToken({ email: user.email, password: user.password})
        res.json({
          token: token,
          username: user.username,
          avatar: user.avatar,
          admin: user.admin,
          email: user.email
        })
      }
    }
  })
}


const updateProfile = (req, res) => {
  	User.findOne({
  		email: req.user.email
  	}, (err, user) => {
  		if (err) throw err
      user.email = req.body.email || user.email
      user.avatar = req.body.avatar || user.avatar
      user.save()

      res.json({
          avatar: user.avatar,
          email: user.email
      })
  	})
}

const getUserProfilePageInfo = (req, res) => {
  User.findOne({
    username: req.query.username
  }, (err, user) => {
    if (err) throw err

    res.json({
      username: user.username,
      avatar: user.avatar,
      joined: user.joined
    })
  })
}

module.exports = {
    createUser,
    getUsers,
    verifyUser,
    authenticateUser,
    updateProfile,
    getUserProfilePageInfo
}
