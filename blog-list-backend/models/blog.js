const mongoose = require('mongoose')
const { Transform } = require('supertest/lib/test')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number
})

blogSchema.set('toJSON', {
      transform: (document, returedObject) => {
      returedObject.id = returedObject._id.toString()
        delete returedObject._id
        delete returedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)