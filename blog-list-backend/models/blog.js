const mongoose = require('mongoose')
const { Transform } = require('supertest/lib/test')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
      transform: (document, returedObject) => {
      returedObject.id = returedObject._id.toString()
        delete returedObject._id
        delete returedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)