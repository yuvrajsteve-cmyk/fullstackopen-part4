const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')

// blogsRouter.get('/', async (request, response) => {
//   const blogs = await Blog.find({})
//   response.json(blogs)
// })

// blogsRouter.post('/', async (request, response) => {
//   const blog = new Blog(request.body)
//   const savedBlog = await blog.save()
//   response.status(201).json(savedBlog)
// })

// add new blog router for exercise with promise based
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})


// add new blog router for exercise with async / await based

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

module.exports = blogsRouter