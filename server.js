// Setup empty JS object to act as endpoint for all routes

projectData = {}

const express = require('express')

const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initializing of the main project folder
app.use(express.static('client'))

// Setup Server

app.listen(port, () => {
  console.log(`Server is running locally on port ${port}`)
})


app.post('/add_weather', (req, res) => {
  console.log('/add_weather', req.body)
  projectData = req.body
  res.status(201)
})

app.get('/get_weather', (req, res) => {
  console.log('/get_weather', projectData)
  
  res.status(200).json({ ...projectData })
})
