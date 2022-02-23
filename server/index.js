// Import required packages 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// If you need to use env file use need to use this 
require('dotenv').config();

// Connecting atlas database
connectDB();

// Creating App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Use router
app.use('/api', require('./routes/api'));

// If env have port define use it else use port 8000
const port = process.env.PORT || 8000;
app.listen(port,() => console.log(`Server is running on port ${port}`));