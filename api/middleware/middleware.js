const User = require('../users/users-model.js')

function logger(req, res, next) {
  console.log(`[${new Date().toLocaleString()}] ${req.method} tp ${req.originalUrl}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    req.status(500).json({
      message: 'problem finding user'
    })
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
    req.text = text.trim()
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}