const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let status = {
        title: 'success', 
        authorized: 'Google'
    }
    res.render('authorized', status );
});

module.exports = router;
