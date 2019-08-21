const app = require('express')()
const passport = require('passport')
const authRoutes = require('./routes/auth')
const passportSetup = require('./config/passport-setup')
const port = process.env.PORT || 5000;
const cookieSession = require('cookie-session')
const keys = require('./config/keys')

app.use('/auth', authRoutes)
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  }))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res)=>{
  res.send("OI")
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

app.listen(port, () => console.log(`Listening on port ${port}`));
