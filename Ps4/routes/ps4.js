const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const fetchoption = require('../Config/config')
const Convert = require('../ConvertFunction');



const getData = async (CountryCode) => {
    let rawCovidData = await fetch(fetchoption.fetchoptions.url + CountryCode);
    let cleanCovidData = await rawCovidData.json();
    return cleanCovidData;
}

router.post('/', (req, res, next) => {
    let CountryName = req.body.CountryName
    let CountryCode = Convert.getCountryCode(CountryName)
    getData(CountryCode).then(data => {
//        console.log(data.data)
        res.render('CovidDataRender', data.data)

    });

});


module.exports = router;
