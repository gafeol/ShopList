const app = require('express')()
const passport = require('passport')
const authRoutes = require('./routes/auth')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000;
//const cookieSession = require('cookie-session')
const keys = require('./config/keys')

app.use('/auth', authRoutes)
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
  console.log('connected to mongodb');
});

app.get('/', (req, res)=>{
  res.send("OI")
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

app.listen(port, () => console.log(`Listening on port ${port}`));
