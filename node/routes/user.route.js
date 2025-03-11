const express = require("express");
const Product = require("../models/user.model.js");
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser, follow} = require('../controllers/user.controller.js');
const {signUp, signIn, logout} = require('../controllers/auth.controller.js');
const uploadController = require('../controllers/upload.controller.js');
//const multer = require('multer');
//const upload = multer();


router.get('/', getUsers);
router.get('/:userId', getUser);

//router.get("/:id", getProduct);

router.post("/", createUser);

router.put("/:pseudo", updateUser);

router.delete("/:pseudo", deleteUser);

router.post("/register", signUp);
router.post('/login', signIn);
router.get("/logout", logout);
router.patch("/follow/:id", follow);


// upload
//router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;
 
