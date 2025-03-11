const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const {signUpErrors, signInErrors} = require('../utils/errors.utils.js');

maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    try{
        const user = await User.create(req.body);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, secure: false, sameSite: 'lax', maxAge:maxAge})
        res.status(200).json({user: user._id, token: token })
     } catch (err) {  
        const errors = signUpErrors(err);
         res.status(400).send( {errors} );
     }

}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, secure: false, sameSite: 'lax', maxAge:maxAge})
        res.status(200).json({user: user._id, token: token })
        console.log(token);

    } catch (err) { 
        const errors = signInErrors(err);
         res.status(400).send( {errors} );
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1});
    res.redirect('/');
}