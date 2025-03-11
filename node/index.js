const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Product = require("./models/product.model.js");
const User = require("./models/user.model.js");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");
const postRoute = require("./routes/post.route.js");
const chatRoute = require("./routes/chat.route.js");
const app = express();
const {checkUser, requireAuth} = require('./middleware/auth.middleware.js');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const cors = require('cors');
//app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));
  
  //app.use(cors(corsOptions));


//app.use(cors({origin: process.env.CLIENT_URL}));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


//jwt
/*
app.get('*', (req, res) => {
    try{
        checkUser(req, res, ()=>{});
    }catch(e){
        console.log("Error in checkUser:", e);
    }
});
*/
//app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});


//routes
app.use("/api/products", productRoute); 
app.use("/api/user", userRoute); 
app.use("/api/post", postRoute);
app.use("/api/chat", chatRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});  

app.get("/", (req, res) => {
    console.log("Trying to get base url");
    res.send("Hello from  Node API Server Upadated");
});


