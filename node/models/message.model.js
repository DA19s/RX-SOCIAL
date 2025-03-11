const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderPseudo: { type: String, required: true },
  receiverId: { type: String, required: true },
  receiverPseudo: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }});

const message = mongoose.model("message", messageSchema);

module.exports = message;