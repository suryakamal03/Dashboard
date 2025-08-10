const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Make sure these paths match your file structure
const userRoute = require('./route/Userroute.js');
const priorityRoute = require('./route/Priorityroute.js');
const dayRoute = require('./route/Dayroute.js');

app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // THIS IS THE FIX:
        // Only start listening for requests AFTER the database is connected.
        app.listen(port, () => {
            console.log(`SERVER STARTED: Listening on PORT ${port}`);
        });

    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit if we can't connect
    }
};

// --- ROUTES ---
app.use('/api/auth', userRoute);
app.use('/api/priority', priorityRoute);
app.use('/api/day', dayRoute);

// Call the function to start the connection and the server
connectDB();