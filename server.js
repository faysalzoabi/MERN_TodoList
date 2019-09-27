require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const path = require('path');
const app = express();


// let server access JSON in the body
app.use(express.json());


// connect to mongodb
mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))


app.use('/api/items',items);
app.use('/api/users', users);

// serve static assets if in production
if(process.env.NODE_ENV === 'production' ) {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
