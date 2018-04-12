const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session')
const passport = require('passport');

const app = express();

//set up view engine

app.set('view engine', 'ejs');

// setting up the cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));


//initialize passport

app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb (need a setup)
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoUserOAuth";
mongoose.connect(MONGODB_URI, ()=>{
    console.log('connected to mongodb')
    
});


//setup routes
app.use("/auth",authRoutes);
app.use("/profile/",profileRoutes);

//create home route
app.get('/', (req, res) =>{
    res.render('home');
})



app.listen(3000, () => {
    console.log('app now listening fon port 3000')
})