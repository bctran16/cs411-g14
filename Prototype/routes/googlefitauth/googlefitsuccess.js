const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // let status = {
    //     title: 'success', 
    //     authorized: 'Google',
    //     username: req.user.username
    // }
    // res.render('authorized', status );
    //es.redirect('/authorized')
    let status = {
        title: 'success', 
        username: req.user.username,
        fitbitlink: "location.href='http://localhost:3000/auth/fitbit';"
    }
    res.render('firstoauth', status)
});

module.exports = router;
