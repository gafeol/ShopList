const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const mongoose = require('mongoose')
const keys = require('./keys')

mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log("Connected to mongodb")
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToke, refreshToken, profile, done) => {
        //passport callback function
        console.log("PROFILE", profile)
        done()
    })
)