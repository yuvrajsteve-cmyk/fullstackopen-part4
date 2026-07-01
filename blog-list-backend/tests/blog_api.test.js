const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


console.log('TEST_MONGODB_URI:', process.env.TEST_MONGODB_URI) 


const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


jest.setTimeout(30000)

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI)
  console.log('Mongoose state:', mongoose.connection.readyState) 
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})