const { query } = require('express');
const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();

// var params = ['activityName', 'startTime', 'durationMillis', 'date' , 'distance']

const addData = async (token) => {
    let rawData = await fetch('https://api.fitbit.com/1/user/-/activities.json', {
        method: "POST",
        headers: {"Authorization": "Bearer " + token }})
    let cleanData = await NewData.json()
    return cleanData
}

router.post('/', (req, res, next) => {
    res.render('why')
    /*addData(req.user.token).then(data => {
    //console.log("this is the users data" + data);
    //console.log()
    let newData = {
    Activity_Type: data.activityLog.activityId, 
    distance: data.activity, 
    mostperday: data.best.total.distance.value, 
    steps: data.lifetime.total.steps
    };
   res.render('display', displayData);
   */
   
    });
    module.exports = router;