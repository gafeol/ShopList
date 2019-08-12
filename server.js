const app = require('express')()
const passport = require('passport')
const authRoutes = require('./routes/auth')
const passportSetup = require('./config/passport-setup')
const port = process.env.PORT || 5000;

app.use('/auth', authRoutes)

app.get('/', (req, res)=>{
  res.send("OI")
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

app.listen(port, () => console.log(`Listening on port ${port}`));
