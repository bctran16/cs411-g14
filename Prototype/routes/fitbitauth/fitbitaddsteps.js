const { query } = require('express');
const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();

// var params = ['activityName', 'startTime', 'durationMillis', 'date' , 'distance']
const addData = async (token, body) => {
    let newData = await fetch('https://api.fitbit.com/1/user/-/activities.json', {
        method: "POST",
        headers: {"Authorization": "Bearer " + token },
        body: JSON.stringify(body)
    })
    let cleanData = await newData.json()
    console.log("these are the fruits of my labor" + JSON.stringify(cleanData))
    return cleanData
}

router.get('/', (req, res, next) => {
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

router.post('/', (req,res, next) =>{
    // console.log("please info " + req.body.activityName)
    // console.log("token please : " + req.user.token)
    console.log("here you go tim" + JSON.stringify(req.body))
    addData(req.user.token, req.body)
    res.render('sick')
})

    module.exports = router;

