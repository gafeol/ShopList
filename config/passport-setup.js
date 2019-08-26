const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys')
const User = require('../models/user')

passport.use(
    new GoogleStrategy({
        callbackURL: 'http://localhost:5000/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log('vai salvar user')
        new User({
            username: profile.displayName,
            googleId: profile.id
        }).save().then((newUser) => {
            console.log("new user created ", newUser)
        })
        console.log('ja deveria estar salvando')
        /*
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                console.log('user is already registered')
            }
            else {
                console.log('vai criar o user')
                User.create({
                    username: profile.displayName,
                    googleId: profile.id
                }).then((newUser) => {
                    console.log("new user created ", newUser)
                })
            }
        })
        */
    })
)