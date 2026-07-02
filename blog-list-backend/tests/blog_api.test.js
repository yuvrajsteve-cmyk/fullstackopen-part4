const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') 
const api = supertest(app)
const Blog = require('../models/blog')

    const initialBlogs = [
      { 
        title: 'React patterns', 
        author: 'Michael Chan', 
        url: 'https://reactpatterns.com/', 
        likes: 7 
      },

      { 
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/', 
        likes: 5 
      }
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
    
     // first test 
      test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
 

      // second test 
    test('there are two blogs', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length)
    })



// start the new test for the new exercise 
         // third test 
      test('blog posts have a unique identifier named id', async () => {
        
        const response = await api.get('/api/blogs')
        const firstBlog = response.body[0]
        console.log('data from the backend', response.body[0])
        expect(firstBlog.id).toBeDefined()
      })

  // write a new test for a new exercise 
      // fourth test
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
  

  // write the new test for the new exercise
  // fifth test
   test('if the likes property is missing, it wil default to 0', async () => {
     const newBlogWithoutLikes = {
      title: 'Type wars',
      author: 'Robert C, Martin',
      url: 'http://cleancoder.com'
     }

     const response = await api 
     .post('/api/blogs')
     .send(newBlogWithoutLikes)
     .expect(201)
     .expect('Content-Type', /application\/json/)

     expect(response.body.likes).toBe(0)
   })
   

  //  4.12*: Blog List tests, step 5 add two new tests 
  // sixth test 
  test('blog without title is not added and responds with 400 Bad Request', async () => {
    const newBLogWithoutTitle = {
      author: 'Robert C, Martain',
      url: 'http://cleancoder.com',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBLogWithoutTitle)
      .expect(400)
  })

  // seven test 
  test('blog without url is not added and responsed with 400 Bad Request', async () => {
    const newBlogWithoutUrl = {
      title: 'Types wars',
      author: 'Robert C. Martin',
      likes: 2
    }

    await api 
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
  })
   
      //  the most important function 
      afterAll(async () => {
        await mongoose.connection.close() 
      })