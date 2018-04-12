const router = require('express').Router();


//checking if the user is already logged in
const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    }else {
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    res.render('profile', {user: req.user});
})

module.exports = router;