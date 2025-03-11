
const User = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const jwt = require('jsonwebtoken');


const getUsers = async (req, res) => {
    try {
        const Users = await User.find().select();
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUser = async (userId) => {
    try {

        const Users = await User.findById(userId).select("pseudo");
        return Users
    } catch (error) {
        throw error    }
}


const createUser = async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(200).json(user);
     } catch (error) {
         res.status(500).json({message: error.message});
     }
 }

 const updateUser = async (req, res) => {
   /* console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID Unknown : " + req.params.id); */
    try {
        const {id} = req.params;

        const user = await User.findOneAndUpdate({id: id}, req.body)

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const updatedUser = await User.findOneAndUpdate({id: req.body.id});
        res.status(200).json(updatedUser);

    } catch (error) {
         res.status(500).json({message: error.message});
    }
}


const deleteUser = async (req, res) => {
    try {
        const {pseudo} = req.params;

        const user = await User.findOneAndDelete({pseudo: pseudo});

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({message: "User deleted succesfully"});


    } catch (error) {
        res.status(500).json({message: error.message});
    }};


    follow = async (req, res) => {
        if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send({ error: "ID Unknown : " + req.params.id });


        const token = req.cookies.jwt;

        console.log(token);
        

        if (!token) {
            return res.status(401).json({ message: 'Token not provided, please log in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;  
        console.log(userId);
        console.log(req.params.id);
        const followedId = req.params.id
        try {
           const updatedUsr = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { followers: userId }
                },
                {new: true}, 
            );
            console.log(updatedUsr);
            
                    if (!updatedUsr) return res.status(404).send({ error: "User not found" });

                const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: { following: followedId }
                },
                { new: true },
            );
            console.log(updatedUser);
            

                    if (!updatedUser) return res.status(404).send({ error: "User not found" });
                    return res.status(200).send({updatedUser, updatedUsr});
                  //  console.log({updatedUser, updatedUsr});
                    
        } catch (err) {
            return res.status(400).send(err);
        }
};



module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    follow,
};