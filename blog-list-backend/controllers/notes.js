const notesRouter = require('express').Router()
const { response } = require('../app')
const Note = require('../models/note')


notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})


notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})
  

 notesRouter.post('/api/notes', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
  .then(savedNote => {
    response.status(201).json(savedNote)
  })
  .catch(error => next(error))
 })

 notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
 })

//  add delete 
   notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
   })

module.exports = notesRouter