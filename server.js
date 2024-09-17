const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Middleware to serve static files and parse request body
app.use(express.static('public'));
app.use(bodyParser.json());

const mongoUrl = 'mongodb://localhost:4000';
const dbName = 'feedbackDB';
let db;

// Connect to MongoDB
MongoClient.connect(mongoUrl)
    .then(client => {
        console.log('Connected to Database');
        db = client.db(dbName);
    })
    .catch(error => console.error(error));

// POST route to handle feedback submission
app.post('/submit-feedback', (req, res) => {
    const feedbackCollection = db.collection('feedbacks');
    const feedbackData = {
        name: req.body.name,
        email: req.body.email,
        feedback: req.body.feedback,
        date: new Date()
    };

    feedbackCollection.insertOne(feedbackData)
        .then(result => {
            res.json({ success: true });
        })
        .catch(error => {
            console.error(error);
            res.json({ success: false });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
