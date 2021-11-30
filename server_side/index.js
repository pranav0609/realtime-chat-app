const express = require('express')
const app = express();
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { User } = require('./models/user');
const { Message } = require('./models/message');
const { Chat } = require('./models/chat')
const config = require('./configurations/keys');
const { auth } = require('./middleware/auth');
//const { connect } = require('http2');

const connect = mongoose.connect(config.MongoURI, {useNewUrlParser: true})
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.log('couldnot connect to mongodb', err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/chat', require('./routes/chat'))


const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})
 

var upload = multer({ storage: storage }).single("file")

app.post('/api/chat/uploadfiles', auth, async (req, res) => {
    upload(req, res, err => {
        if(err) {
          return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path });
      })
})

io.on("connection", socket => {
    socket.on("Input Chat Message", msg => {
        connect.then(db => {
            try {
                console.log("id is", msg.userId);
                let chat = new Chat({ message: msg.chatMessage, sender: msg.userId, type: msg.type })

                chat.save((err, doc) => {
                    if(err) return res.json({ success: false, err })
                    Chat.find({"_id": doc._id})
                    .populate("sender")
                    .exec((err, doc) => {
                        return io.emit("output chat message", doc)
                    })
                })
            }
            catch(error) {
                console.error(error);
            }
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role
    })
})

app.post('/api/users/register', async (req, res) => {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
        
    user.save((err, data) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            userData: data
        });
    })
})

app.post('/api/users/about', async (req, res) => {

    const message = new Message(req.body);

    message.save((err, data) => {

        if(err) return res.json({success: false, err});

        res.status(200).json({

            success: true,

            userData: data

        });

    })

})

app.post('/api/users/login', async (req, res) => {
    User.findOne({email: req.body.email}, async (err, user) => {
        if(!user)
            return res.json({
                loginSuccess: false,
                message: "wrong username"            
        })
        const password = await bcrypt.compare(req.body.password, user.password);
        if(!password) return res.json({
            loginSuccess: false,
           message: "Invalid password"
        });
        var token = jwt.sign(user._id.toHexString(), 'secret');

        user.token = token;
        user.save((err, user) => {
            if(err) return err;
            res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    message: "logged in!",
                    token: user.token
                })
        })
        
    })
})


app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


app.get('/', (req, res) => {
    res.send("hello world");
})

app.use('/uploads', express.static('uploads'));


const port = process.env.PORT || 4500

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});