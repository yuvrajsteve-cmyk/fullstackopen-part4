const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const assert = require('assert')

const api = supertest(app)

jest.setTimeout(30000) 

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.TEST_MONGODB_URI)
  }
})

const initialNotes = [
  { content: 'HTML is easy', important: false },
  { content: 'Browser can execute only JavaScript', important: true }
]

beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
}, 30000)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('notes are returned as json', async () => {
  await api
  .get('/api/notes')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test.only('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, 2)
})

afterAll(async () => {
  await mongoose.connection.close()
})