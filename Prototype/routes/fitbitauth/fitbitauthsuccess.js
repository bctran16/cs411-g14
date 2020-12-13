const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();

const getData = async (token) => {
    let rawData = await fetch('https://api.fitbit.com/1/user/-/activities.json', {
        method: "GET",
        headers: {"Authorization": "Bearer " + token }})
    let cleanData = await rawData.json()
    return cleanData
}

router.get('/', (req, res, next) => {
    res.redirect('/authorized')
    // let status = {
    //     title: 'success', 
    //     authorized: 'Fitbit',
    //     username: req.user.profile.displayName, 
    //     val: "Google", 
    //     googlelink: "location.href='http://localhost:3000/auth/google';"
    // }
    // res.render('firstoauth', status)
   /* getData().then(data => {
        let displayData = {
        title:'bit2health',
        username:  req.user.username, 
        distance: data.lifetime.total.distance, 
        mostperday: data.best.total.distance.value
        };
       res.render('display', displayData);
        })
        */
    
});


module.exports = router;
