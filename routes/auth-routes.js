const  router  = require('express').Router();
const passport = require('passport');
//auth login

router.get('/login', (req, res) => {
    res.render('login');
})

//auth logout

router.get('/logout', (req, res) => {
//handled with passport
console.log('here')
    res.send('loggin out');
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback for google to redirect to

router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    //accessing the user object
    
    // res.send(req.user)
    res.redirect('/profile/');
})

module.exports = router;