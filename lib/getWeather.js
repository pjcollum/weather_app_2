const fetch = require('node-fetch');                // npm i  request

require('dotenv').config()     //https://www.npmjs.com/package/dotenv

//const url= `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.APPID}`   //app id linked to api key

const getWeather = async (location, countryCode) => {        //async function


    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},${countryCode}&APPID=${process.env.APPID}`)   //app id linked to api key
    return await data.json()


}
module.exports = getWeather;       // export the function getWeather

