const { query } = require('express');
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
   // res.redirect('/authorized')
    // let status = {
    //     title: 'success', 
    //     authorized: 'Fitbit',
    //     username: req.user.profile.displayName, 
    //     val: "Google", 
    //     googlelink: "location.href='http://localhost:3000/auth/google';"
    // }
    // res.render('firstoauth', status
    getData(req.user.token).then(data => {
        let displayData = {
        title:'StepsSyncer',
        username:  req.user.username, 
        steps: data.lifetime.total.steps, 
        distance: data.lifetime.total.distance,
        mostperday: data.best.total.steps.value
        };
       res.render('display', displayData);
        })
        
    
});


module.exports = router;
