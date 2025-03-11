const express = require("express");
const Product = require("../models/user.model.js");
const router = express.Router();
const {chat, sendMessage, getUserChat, lastChat} = require('../controllers/chat.controller.js');

router.get("/getUserChat", getUserChat);
router.get("/conv/:id_receiver", chat);
router.get("/last", lastChat);
router.post("/sendMessage", sendMessage);

module.exports = router;
