const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/user') 
const config = require('./configurations/keys')

mongoose.connect(config.MongoURI, {useNewUrlParser: true})
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.log('couldnot connect to mongodb', err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, data) => {
        if(err) return res.json({success: false, err});
        return res.status(200);
    })
})

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(4500);