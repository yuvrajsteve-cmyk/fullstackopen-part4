const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')
const assert = require('assert')

const api = supertest(app)

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.TEST_MONGODB_URI)
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
  }
})

beforeEach(async () => {
  await Note.deleteMany({})
  
  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()
  
  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
}, 30000)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/ )

    assert.deepStrictEqual(resultNote.body, noteToView)
})

   // add delete

   test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const ids = notesAtEnd.map(n => n.id)
  assert(!ids.includes(noteToDelete.id))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})