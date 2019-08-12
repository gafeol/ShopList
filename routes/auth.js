const router = require('express').Router()
const passport = require('passport')


router.get('/login', (req, res)=>{
    res.send("FOI")
})

router.get('/logout', (req, res)=>{
    res.send("logging out")
})


router.get('/google', passport.authenticate('google', {
    scope: ['profile'] 
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send("FOI")
})

module.exports = router