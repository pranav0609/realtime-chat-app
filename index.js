const express = require('express')
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/realtime_chat')
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.log('couldnot connect to mongodb', err));

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(4500);