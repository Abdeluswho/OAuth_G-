const  router  = require('express').Router();

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
router.get('/google', (req ,res) => {
    //passport google OAuth handler
    res.send('loggin in with google')
})

module.exports = router;