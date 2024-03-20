const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// In-memory data (consider using a database for persistence)
let controlList = [
  { mainID: '1', mainDescription: 'Sample Control 1', domain: 'Sample Domain', scope: 'Sample Scope' },
  { mainID: '2', mainDescription: 'Sample Control 2', domain: 'Sample Domain', scope: 'Sample Scope' }
];

//Get controls
app.get('/controls', (req, res) => {
  res.json(controlList);
});

// POST /controls - Add a new control (validation and error handling)
app.post('/controls', (req, res) => {
  const { mainID, mainDescription, domain, scope } = req.body;

  // Basic validation (add more as needed)
  if (!mainID || !mainDescription || !domain || !scope) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check for duplicate mainID (consider using a Set for faster lookups)
  const existingControl = controlList.find(control => control.mainID === mainID);
  if (existingControl) {
    return res.status(409).json({ message: 'Duplicate mainID found' });
  }

  const newControl = { mainID, mainDescription, domain, scope };
  controlList.push(newControl);

  res.status(201).json({ message: 'Control added successfully', control: newControl });
});

// PUT /controls/:id - Update a control (validation and error handling)
app.put('/controls/:id', (req, res) => {
  const { id } = req.params;
  const { mainDescription, domain, scope } = req.body;

  // Basic validation
  if (!mainDescription || !domain || !scope) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const controlIndex = controlList.findIndex(control => control.mainID === id);
  if (controlIndex === -1) {
    return res.status(404).json({ message: 'Control not found' });
  }

  controlList[controlIndex] = { ...controlList[controlIndex], mainDescription, domain, scope };

  res.json({ message: 'Control updated successfully' });
});

// DELETE /controls/:id - Delete a control (error handling)
app.delete('/controls/:id', (req, res) => {
  const { id } = req.params;

  const controlIndex = controlList.findIndex(control => control.mainID === id);
  if (controlIndex === -1) {
    return res.status(404).json({ message: 'Control not found' });
  }

  controlList.splice(controlIndex, 1);

  res.json({ message: 'Control deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
