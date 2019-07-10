const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect to db
connectDB();

app.use(express.json({extended: false}));

// Routes
app.use('/',require('./routes/index'));
app.use('/api/url',require('./routes/url'));


const PORT = 5000;
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`)); 