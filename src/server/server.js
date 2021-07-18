// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express');
var path = require('path');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance

app.use(cors());

// Initializing of the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(3003, () => {
  console.log('Server is running locally on port 3003');
});

app.post('/add_weather', (req, res) => {
  console.log('/add_weather', req.body);
  projectData = req.body;
  res.status(201);
});

app.get('/get_weather', (req, res) => {
  console.log('/get_weather', projectData);

  res.status(200).json({ ...projectData });
});
