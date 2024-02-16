// Import required modules
const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const database = require('./database'); 

const path = require('path'); // Node.js module for working with file paths

// Create an instance of the Express application
const app = express();

// Define the port for the server to listen on
const PORT = process.env.PORT || 3000; // Default port is 3000, or use the port specified in the environment variable

// Middleware configuration
app.use(cors()); // Enable CORS for all routes
app.use(express.static(path.join(__dirname, '..', 'FrontEnd'))); // Serve static files from the 'FrontEnd' directory
app.use(bodyParser.json()); 

// Define routes

// GET request handler for the root URL
app.get('/', (req, res) => {
    // Send the index.html file as the response
    res.sendFile(path.join(__dirname, '..', 'FrontEnd', 'index.html'));
});

// POST request handler for form submissions
app.post('/submit', async (req, res) => {
    // Extract data from the request body
    const { name, email, contact } = req.body;

    // Validate form data
    if (!name || !email || !contact) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    // Check if the email address already exists in the database
    if (await database.findEntryByEmail(email)) {
        return res.status(400).json({ message: 'This email address already exists.' });
    }

    // Add the form submission to the database
    await database.addSubmission({ name, email, contact });

    // Send success response
    res.json({ success: true, message: 'Form submitted successfully.' });
});

// GET request handler for retrieving all submissions
app.get('/submissions', async (req, res) => {
    // Retrieve all submissions from the database
    const submissions = await database.getAllSubmissions();
    
    // Send the submissions data as JSON response
    res.json(submissions);
});

// GET request handler for rendering the submissions page
app.get('/submissions', async (req, res) => {
    // Retrieve all submissions from the database
    const submissions = await database.getAllSubmissions();
    
    // Render the submissions page with the data
    res.render('submissions', { submissions });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
