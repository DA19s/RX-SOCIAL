const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const {getUser} = require('../controllers/user.controller.js');



module.exports.readPost = async (req, res) => {
    try {
    const docs = await PostModel.find().sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (err) {
    console.error('Error to get data :', err);  // Log de l'erreur côté serveur
    res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts." });
}
    }
    
    module.exports.readPostUser = async (req, res) => {

        try {
        const docs = await PostModel.find({posterId: req.params.id}).sort({ createdAt: -1 });
            res.status(200).json(docs);
        } catch (err) {
        console.error('Error to get data :', err);  // Log de l'erreur côté serveur
        res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts." });
    }
        }
 

module.exports.createPost = async (req, res) => {
console.log("okk");
console.log(req.cookies);


    const token = req.cookies.jwt;
console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Token not provided, please log in.' });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;  

    const newPost = new PostModel({
        message: req.body.message,
        posterId: userId,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.updatePost = async (req, res) => {
    // Vérifier si l'ID est valide
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({ error: "ID Unknown : " + req.params.id });
    }

    // Obtenir les données à mettre à jour
    const updatedRecord = {
        message: req.body.message
        // Vous pouvez ajouter d'autres champs ici si nécessaire
        // Exemple : video: req.body.video
    };

    try {
        // Mise à jour du post dans la base de données
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatedRecord },
            { new: true }  // Retourner le post mis à jour
        );

        // Vérifier si le post a été trouvé et mis à jour
        if (!updatedPost) {
            return res.status(404).send({ error: "Post non trouvé" });
        }

        // Retourner le post mis à jour
        return res.status(200).json(updatedPost);
    } catch (err) {
        // Gérer les erreurs et les renvoyer au client
        console.error("Erreur lors de la mise à jour : ", err);
        return res.status(500).send({ error: "Une erreur s'est produite lors de la mise à jour du post" });
    }
};


module.exports.deletePost = async (req, res) => {
    // Vérifier si l'ID est valide
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({ error: "ID Unknown : " + req.params.id });
    }

    try {
        // Suppression du post avec l'ID fourni
        const deletedPost = await PostModel.findByIdAndDelete(req.params.id);

        // Vérifier si le post a été trouvé et supprimé
        if (!deletedPost) {
            return res.status(404).send({ error: "Post non trouvé" });
        }

        // Retourner une réponse de succès
        return res.status(200).send({ message: "Post supprimé avec succès" });
    } catch (err) {
        // Gestion des erreurs en cas d'échec de la suppression
        console.error("Erreur lors de la suppression du post : ", err);
        return res.status(500).send({ error: "Une erreur s'est produite lors de la suppression du post" });
    }
};


module.exports.likePost = async (req, res) => {
        if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send({ error: "ID Unknown : " + req.params.id });


        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Token not provided, please log in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;  
        console.log(userId);

        try {
           const updatedPost = await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $addToSet: { likers: userId }
                },
                {new: true},
            );
                    if (!updatedPost) return res.status(404).send({ error: "Post not found" });

                const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                {
                    $addToSet: { likes: req.params.id }
                },
                { new: true },
            );
                    if (!updatedUser) return res.status(404).send({ error: "Post not found" });
                    return res.status(200).send({updatedUser, updatedPost});
        } catch (err) {
            return res.status(400).send(err);
        }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send({ error: "ID Unknown : " + req.params.id });


    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided, please log in.' });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;  
    console.log(userId);


        try {
           const updatedPost = await PostModel.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: { likers: userId }
                },
                {new: true},
            );
                    if (!updatedPost) return res.status(404).send({ error: "Post not found" });

                const updatedUser = await UserModel.findByIdAndUpdate(
                    userId,
                {
                    $pull: { likes: req.params.id }
                },
                { new: true },
            );
                    if (!updatedUser) return res.status(404).send({ error: "Post not found" });
                    return res.status(200).send({updatedUser, updatedPost});
        } catch (err) {
            return res.status(400).send(err);
        }
};


module.exports.commentPost = async (req, res) => {

    const token = req.cookies.jwt;
    console.log(token);
    

    if (!token) {
        return res.status(401).json({ message: 'Token not provided, please log in.' });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;  
    console.log(userId);
    

    const user = await getUser(userId)
    const userPseudo = user?.pseudo
    console.log(userPseudo);


    try {
        const comment = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: userId,
                        commenterPseudo: userPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true,}
        );
        if (!comment) return res.status(404).send({ error: "Post not found" });
        return res.status(200).send(comment);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.editCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send({ error: "ID Unknown : " + req.params.id });

    try {
        const post = await PostModel.findById(req.params.id)
        if (!post) return res.status(404).send({ error: "Post not found" });
 
                const theComment = post.comments.find((comment) => 
                    comment._id.equals(req.body.commentId)
            )

                if (!theComment) return res.status(404).send("Comment Not Found")
                    theComment.text = req.body.text;

                await post.save();
                return res.status(200).send(post)
            } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.deleteCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send({ error: "ID Unknown : " + req.params.id });

    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.id,
        {
            $pull: {
                comments: {
                    _id: req.body.commentId,
                }
            }
        },
        { new: true, }
    );
    if (!updatedPost) return res.status(404).send("Comment not found");
    res.status(200).send(updatedPost);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.readComment = async (req, res) => {
    try {
    const docs = await PostModel.find().sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (err) {
    console.error('Error to get data :', err);  // Log de l'erreur côté serveur
    res.status(500).send({ error: "Une erreur est survenue lors de la récupération des posts." });
}
    }


