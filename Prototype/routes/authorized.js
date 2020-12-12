const router = require('express').Router()

router.get('/', (req, res) => 
{
    let status = {
        username: req.user.username
    }
    res.render('authorized', status );
})

module.exports = router;