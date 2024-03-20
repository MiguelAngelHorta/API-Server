// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Choose a port for your server

app.use(cors());
app.use(bodyParser.json());

let controlList = [];

// CRUD operations

// Create - Add a new control
app.post('/controls', (req, res) => {
  const newControl = req.body;
  controlList.push(newControl);
  res.json(newControl);
});

// Read - Get all controls
app.get('/controls', (req, res) => {
  res.json(controlList);
});

// Read - Get a specific control by ID
app.get('/controls/:id', (req, res) => {
  const controlId = req.params.id;
  const control = controlList.find(c => c.mainID === controlId);
  if (control) {
    res.json(control);
  } else {
    res.status(404).json({ error: 'Control not found' });
  }
});

// Update - Update a specific control by ID
app.put('/controls/:id', (req, res) => {
  const controlId = req.params.id;
  const updatedControl = req.body;
  const index = controlList.findIndex(c => c.mainID === controlId);
  if (index !== -1) {
    controlList[index] = updatedControl;
    res.json(updatedControl);
  } else {
    res.status(404).json({ error: 'Control not found' });
  }
});

// Delete - Delete a specific control by ID
app.delete('/controls/:id', (req, res) => {
  const controlId = req.params.id;
  controlList = controlList.filter(c => c.mainID !== controlId);
  res.json({ message: 'Control deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
