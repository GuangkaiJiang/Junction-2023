const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Import node-fetch

const app = express();
app.use(cors({ origin: true }));

// Define your routes here
app.get('/news', async (req, res) => {
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=Outokumpu&from=2023-10-11&sortBy=publishedAt&apiKey=6f27cd6d9f34460cad2344f6bcf942be');
        if (!response.ok) {
            throw new Error(`News API responded with status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news');
    }
});

exports.api = functions.https.onRequest(app);
