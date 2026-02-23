const express = require('express');
const config = require('config');
const cors = require('cors');
const router = require('./route/index.js');

const app = express();
const port = config.get('APP.PORT') || 3001;

app.use(cors({
    origin: ['http://localhost:5173', 'http://192.168.0.163:5173'],
    credentials: true, // Required for Access-Control-Allow-Credentials
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allow all necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Ensure headers like JSON and Auth are allowed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((err, req, res, next) => {
    console.log(err);
    return res.send({success: false, message: err});
});

app.listen(port, () => {
    console.log(`🎉 Server is started in this port ${port}`);
});