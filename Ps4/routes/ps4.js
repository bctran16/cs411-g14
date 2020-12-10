const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const fetchoption = require('../Config/config')
const Convert = require('../ConvertFunction');


router.options("/", function (req, res, next) {
    res.writeHead(200, {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
    });
    res.end();
});


const getData = async (CountryCode) => {
    let rawCovidData = await fetch(fetchoption.fetchoptions.url + CountryCode);
    let cleanCovidData = await rawCovidData.json();
    return cleanCovidData;
}

router.get('/', (req, res, next) => {
    // console.log(req.params)
    // console.log(req.CountryName)
    let CountryName = req.query.CountryName
    let CountryCode = Convert.getCountryCode(CountryName)
    getData(CountryCode).then(data => {
        // console.log(data.data)
        // res.render('CovidDataRender', data.data)
        console.log(CountryName)
        res.json(data.data)


    });

});



module.exports = router;
