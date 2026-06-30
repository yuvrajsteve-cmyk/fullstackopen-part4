const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 5
    },
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returendObject) => {
        returendObject.id = returendObject._id.toString()
        delete returendObject._id
        delete returendObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)