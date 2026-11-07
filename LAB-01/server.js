const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to my Node.js and Express Server!');
});

app.get('/about', (req, res) => {
    res.status(200).json({
        name: 'Mahalaxmi Vennela',
        section: 'CSE-2E'
    });
});

app.get('/time', (req, res) => {
    res.status(200).json({
        currentDateTime: new Date()
    });
});

app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

app.listen(3000, () => {
    console.log('Express server running!');
    console.log('Server Link: http://localhost:3000/');
    console.log('About Link: http://localhost:3000/about');
    console.log('Time Link: http://localhost:3000/time');
});