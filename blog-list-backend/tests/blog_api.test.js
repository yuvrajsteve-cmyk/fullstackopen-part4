const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') 
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/', likes: 5 }
]

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI)
})

beforeEach(async () => {
  await Blog.deleteMany({})
 
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})



// start the new test for the new exercise 

  test('blog posts have a unique identifier named id', async () => {
    
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    console.log('data from the backend', response.body[0])
    expect(firstBlog.id).toBeDefined()
  })

  // write a new test for a new exercise 

  test('a valid blog can be added', async () => {
    const startResponse = await api.get('/api/blogs')
    const totalBlogsAtStart = startResponse.body.length

    const newBlog = {
      title: 'Cononical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://utexas.edu',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201) // for create
      .expect('Content-Type', /application\/json/)

      const endResponse = await api.get('/api/blogs')
      expect(endResponse.body.length).toBe(totalBlogsAtStart + 1)

      const titles = endResponse.body.map(b => b.title)
      expect(titles).toContain('Cononical string reduction')
  })

afterAll(async () => {
  await mongoose.connection.close() 
})