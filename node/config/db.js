const mongoose = require("mongoose");



mongoose
.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@da19.pki3b.mongodb.net/test",
 /*   {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }*/
)
.then(() => console.log("Connected to Mongodb"))
.catch((err) => console.log("Failed TO CONNECT",err));