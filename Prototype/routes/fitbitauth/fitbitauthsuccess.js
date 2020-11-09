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
router.get('/', function(req, res, next) {
    //console.log(req.user)
    getData(req.user.accessToken).then(data => {
        let displayData = {
            title:'bit2health',
            username: req.user.profile.displayName, 
            distance: data.lifetime.total.distance, 
            mostperday: data.best.total.distance.value
        }
        res.render('display', displayData);
    })
});

module.exports = router;
