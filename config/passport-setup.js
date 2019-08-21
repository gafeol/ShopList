const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const mongoose = require('mongoose')
const keys = require('./keys')
const User = require('../models/user')


mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, ()=>{
    console.log("Connected to mongodb")
})

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser((userId, done)=>{
    User.findById(userId).then((user)=>{
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        callbackURL: 'http://localhost:5000/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                console.log('user is already registered')
            }
            else {
                User.create({
                    username: profile.displayName,
                    googleId: profile.id
                }).then((newUser) => {
                    console.log("new user created ", newUser)
                })
            }
        })
        done()
    })
)