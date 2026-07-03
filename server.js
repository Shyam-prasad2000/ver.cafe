import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and body parsing
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'content.json');

// Helper to read content data
const readData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading data file:', err);
  }
  return null;
};

// Helper to write content data
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing data file:', err);
    return false;
  }
};

// API: Get content configuration
app.get('/api/content', (req, res) => {
  const content = readData();
  if (content) {
    res.json(content);
  } else {
    res.status(500).json({ error: 'Database content.json file not found' });
  }
});

// API: Save content configuration
app.post('/api/save-content', (req, res) => {
  const newContent = req.body;
  if (!newContent) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  
  const success = writeData(newContent);
  if (success) {
    res.json({ message: 'Content saved successfully' });
  } else {
    res.status(500).json({ error: 'Failed to write content to database file' });
  }
});

// Serve compiled static frontend files in production
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback all routes to index.html for React Router compatibility
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`CMS Backend Server is running on port ${PORT}`);
});
