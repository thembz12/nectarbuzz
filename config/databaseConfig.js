const mongoose = require("mongoose")
require("dotenv").config()
const URL = process.env.database


mongoose.connect(URL).then(()=>{
    console.log("Connection to MongoDB established successfully");
}).catch((error)=>{
    console.log("Unable to connect to MongoDB because", error);
})