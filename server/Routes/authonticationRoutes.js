const express = require('express');
const router = express.Router();
const userscontrol = require('../Controllers/authorizationController');
const auth = require('../Middleware/authorization');
// const google = require('../Middleware/googleAuth');
const passport = require('passport');
require('../Middleware/googleAuth');

router.post('/register', userscontrol.createUser);
router.post('/login', userscontrol.loginUser);

router.get('/auth/google',
  passport.authenticate('google', 
    { scope:
      [ 'email', 'profile' ] 
    }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/not',
}));

router.get('/protected', auth.authorize, (req, res) => {
    res.send('hello');
});

router.get('/not' , (req, res) => {
    res.send('unauthirized');
});

module.exports = router;