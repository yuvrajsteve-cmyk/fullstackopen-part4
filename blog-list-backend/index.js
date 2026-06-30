require('dotenv').config() 
const app = require('./app')
const mongoose = require('mongoose')


const mongoUrl = process.env.mongoUrl 

console.log('Connecting to:', mongoUrl) 

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    const PORT = process.env.PORT || 3003
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('❌ Error connecting to MongoDB:', error.message)
  })