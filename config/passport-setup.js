const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
    
})

passport.use(
    new GoogleStrategy({
    //options for the strategy
        callbackURL: 'http://localhost:3000/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        //passport callback function
        User.findOne({
            googleid: profile.id
        }).then((currentUser)=>{
            if(currentUser){
                console.log('user is: ', currentUser)
                done(null ,currentUser);
            }else {

                new User({
                    username: profile.displayName,
                    googleid: profile.id,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log("new user created: ", newUser);
                    done(null, newUser);
                })

            }
        })
        

    })
)