const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app