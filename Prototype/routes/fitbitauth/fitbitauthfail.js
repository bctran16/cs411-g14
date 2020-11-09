const express = require('express');
const passport = require('passport')
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
const fitcon = require('../../Config/Config')
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'fail' });
});

module.exports = router;
