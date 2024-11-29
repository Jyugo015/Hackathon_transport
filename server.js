const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const cors = require('cors');
// CORS setup - Allow requests from frontend (port 3000)
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
};

app.use(cors(corsOptions)); // Apply CORS middleware

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ur password',
  database: 'transportation',
});

// Middleware
app.use(bodyParser.json());

// Endpoint to store journey data
app.post('/api/save-journey', (req, res) => {
  const { user_id, pickUp, destination, distance, fee, driver } = req.body;

  // Ensure driver is not null
  const driverName = driver ? driver.name : 'Not Assigned';
  const driverPhone = driver ? driver.phone : 'N/A';

  // SQL query to insert the journey record
  const query = 
    'INSERT INTO journeyRecord (userId, pickUp, destination, distance, fee, driverName, driverPhone) ' +
    'VALUES (?, ?, ?, ?, ?, ?, ?)'
  ;

  db.execute(query, [user_id, pickUp, destination, distance, fee, driverName, driverPhone])
    .then(([result]) => {
      res.status(200).json({ message: 'Journey saved successfully', journeyId: result.insertId });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error saving journey', error });
    });
  
  db.end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});