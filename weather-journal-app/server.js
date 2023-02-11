// Setup empty JS projectData to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 3030;

// Setup Server
const server = app.listen(port,()=>{

console.log(`your server is running on http//:localhost: ${port}`)})

// Post Route
app.post('/postData', (req, res) => {
    projectData={ ... req.body}
    res.send(projectData);
    })

    app.get('/allData', (req, res) => {
        res.send(projectData);
        })
