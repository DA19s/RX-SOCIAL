const User = require("../models/user.model");
const Message = require("../models/message.model");
const ObjectID = require("mongoose").Types.ObjectId;
const jwt = require('jsonwebtoken');
/*
module.exports.getUserChat = async (req, res) => {
    try {
    
            const token = req.cookies.jwt;
    
            if (!token) {
                return res.status(401).json({ message: 'Token not provided, please log in.' });
            }
        
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            const userId = decodedToken.id;  
            console.log(userId);

            const lastMessage = await Message.findOne({
                $or: [
                  { senderId: userId, receiverId: req.params.id_receiver },
                  { senderId: req.params.id_receiver, receiverId: userId }
                ]
              })
              .sort({ createdAt: -1 }) // Trier pour récupérer le plus récent
              .select("senderId receiverId senderPseudo receiverPseudo content"); // Sélectionner les champs nécessaires
          

          
              // Déterminer le pseudo de l'interlocuteur
              const interlocutorPseudo = lastMessage.senderId.toString() === userId
                ? lastMessage.receiverPseudo
                : lastMessage.senderPseudo;
          
              res.status(200).json({
                pseudo: interlocutorPseudo,
                lastMessage: lastMessage.content
              });
          
            } catch (error) {
              res.status(500).json({ message: error.message });
            }
          };

/*
module.exports.getUserChat = async (req, res) => {
    try {
    
            const token = req.cookies.jwt;
    
            if (!token) {
                return res.status(401).json({ message: 'Token not provided, please log in.' });
            }
        
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            const userId = decodedToken.id;  
            console.log(userId);

        const interlocutors = await Message.aggregate([
            {
              $match: {
                $or: [
                  { senderId: userId },
                  { receiverId: userId }
                ]
              }
            },
            {
              $project: {
                interlocutor: {
                  $cond: {
                    if: { $eq: ["$senderId", userId] },
                    then: "$receiverPseudo",
                    else: "$senderPseudo"
                  }
                }
              }
            },
            {
              $group: {
                _id: "$interlocutor"
              }
            }
          ]);
          
          const interlocutorPseudos = interlocutors.map(doc => doc._id);
          
        res.status(200).json(interlocutorPseudos);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
*/

module.exports.chat = async (req, res) => {
    try {


        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Token not provided, please log in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;  
        console.log(userId);
        const id_receiver = await Message.find({receiverPseudo: req.params.id_receiver}).select("receiverId").limit(1); 
        console.log(id_receiver[0].receiverId);
        const Users = await Message.find({$or:
             [
            {senderId: userId, receiverId: id_receiver[0].receiverId},
            {senderId: id_receiver[0].receiverId , receiverId: userId}
        ]
    }).sort({ createdAt: 1 })
        .select("senderPseudo content createdAt");
;
        console.log(Users);
        Users.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        res.status(200).json(Users);
    } catch (error) {
        throw error    }
}

module.exports.lastChat = async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id_receiver)) 
        return res.status(400).send({ error: "ID Unknown : " + req.params.id });


        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Token not provided, please log in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;  
        console.log(userId);
        const Users = await Message.find({$or:
             [
            {senderId: userId, receiverId: req.params.id_receiver},
            {senderId: req.params.id_receiver , receiverId: userId}
        ]
    }).sort({ createdAt: -1 }).limit(1)
        .select("senderPseudo content createdAt");
;
        console.log(Users);

        res.status(200).json(Users);
    } catch (error) {
        throw error    }
}

module.exports.sendMessage = async (req, res) => {
    try {        

       const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Token not provided, please log in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;  
        console.log(userId);
               
       console.log("body:", req.body);

       const receiverId = req.body.receiverId;

        const senderPseudo = await User.findById(userId)
         console.log(senderPseudo);

        const receiverPseudo = await User.findById(receiverId)
         console.log(receiverPseudo);
         

        const newMessage = await Message.create({senderId: userId, senderPseudo: senderPseudo.pseudo, receiverId: req.body.receiverId, receiverPseudo: receiverPseudo.pseudo, content: req.body.content});        
        console.log(newMessage);
        
        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(400).send(error);
    }
} 




