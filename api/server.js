const express = require('express')
const { logger } = require('./middleware/middleware.js')
const usersRouter = require('./users/users-router.js')

const server = express()
server.use(express.json())
server.disable('x-powered-by')

server.use(logger)
server.use('/api/users', usersRouter)
server.use('/api/users/:id', usersRouter)
server.use('/api/users/:id/posts', usersRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server
