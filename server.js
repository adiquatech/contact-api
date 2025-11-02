require('dotenv').config();
const express = require('express');
const { initDb } = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Quadri - Contact API');
});

initDb((err) => {
    if (err) {
        console.log('MongoDB Connection Failed:', err.message);
    } else {
        console.log('MongoDB connected!');
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});