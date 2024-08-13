const express = require ("express")
const passport = require ("passport")
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const session = require("express-session")
require("dotenv").config() 
require ("./config/databaseConfig.js")

const router = require ("./router/userRouter.js")
const app = express()

const port = process.env.port || 1239

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use("/api/v1",router)

app.use(session({
    secret: process.env.session_Secret,
    resave: false,
    saveUninitialized:true
}))

app.get("/", (req,res)=>{
    res.status(200).json({
        message:"WELCOME TO ECOHARVEST"
    })
})

app.use(passport.initialize())
app.use(passport.session())

passport.use(new GoogleStrategy({
    clientID: process.env.client_ID,
    clientSecret: process.env.client_Secret,
    callbackURL: process.env.callbackURL
  },
  function(req,accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  
));

passport.serializeUser((user,done)=>{
  done(null,user)
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})

app.listen(port,()=>{
    console.log("server is listening to", port);
    
})
