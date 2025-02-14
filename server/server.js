require('dotenv').config();
const mysql = require('mysql');
const express = require('express');
const path = require('path');
const cors = require('cors');  // Importing CORS

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS for all requests (or you can configure more granularly)
app.use(cors());

// Database connection setup
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Serve static images (if using local images)
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// API route to fetch slider data from database
app.get('/api/slider', (req, res) => {
  const query = 'SELECT id, image, title, description, url FROM hero_slider';

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching slider data');
    }
    res.json(results);  // Send slider data to frontend
  });
});

// Serve static files (e.g. images) from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
