const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();


router.get('/', function(req, res, next) {
    console.log(req.user)
    res.render('index', req.body.user);
});


module.exports = router;
