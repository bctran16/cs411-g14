const { query } = require('express');
const express = require('express');
const fetch = require('node-fetch')
const router = express.Router();
var FormData = require('form-data');

// var params = ['activityName', 'startTime', 'durationMillis', 'date' , 'distance']
const addData = async (token, body) => {
    console.log(body)
    let formdata = new FormData();
    formdata.append("activityId",body.activityId);
    formdata.append("startTime", body.startTime);
    formdata.append("durationMillis", body.durationMillis);
    formdata.append("distance", body.distance);
    formdata.append("date", body.dateymd);
    // for (var value of formdata.values()) {
    //     console.log(value);
    // }
    let newData = await fetch('https://api.fitbit.com/1/user/-/activities.json', {
        method: "POST",
        headers: {"Authorization": "Bearer " + token },
        body: formdata
    })
    let cleanData = await newData
    console.log("these are the fruits of my labor" + JSON.stringify(cleanData))
    return cleanData
}

router.get('/', (req, res, next) => {
    res.render('data')
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
    // console.log("here you go tim" + JSON.stringify(req.body))
    addData(req.user.token, req.body).then(() => 
    {
        res.render('SAS') //short for "Successfully Added Steps"
    })
    
})

    module.exports = router;