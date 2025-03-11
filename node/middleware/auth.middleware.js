const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log("jwt found : ", token);
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1});
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                console.log(user);
                next();
            }
        }) 
    } else { 
        console.log("REJECTED !!!!!!!");
        res.locals.user = null;
        res.status(401);
        res.send('A token is required to access this ressource');
        next();
    }
}


module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    } else {
        console.log("No token");
        
    }
}