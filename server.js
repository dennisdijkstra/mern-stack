const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const item = require('./routes/api/item');
const user = require('./routes/api/user');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require('./config/keys').mongoURI;


// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected ..'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Use Routes
app.use('/api/item', item);
app.use('/api/user', user);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
