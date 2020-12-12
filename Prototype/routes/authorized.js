const router = require('express').Router()

router.get('/', (req, res) => 
{
    let status = {
        username: req.user.username,
        accessToken: req.user.token

    

    }
    res.render('authorized', status );
})


module.exports = router;