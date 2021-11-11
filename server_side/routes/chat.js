const express = require('express')
const router = express.Router();
const { Chat } = require('../models/chat');

router.get("/getChats", (req, res) => {
    Chat.find()
        .populate("sender")
        .exec((err, chats) => {
            console.log(chats)
            if(err) return res.status(404).send(err);
            return res.status(200).send(chats);
        })
});

module.exports = router;