const hbs = require('express-handlebars');          //import handlebars and path
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');      //import body parser npm i body-parser

const app = express();

const getWeather = require('./lib/getWeather')      //require pulls the get weather file


//use path to join these two paths, tells path is static=all static files to be sent to client
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', hbs({        //handlebars view engine
    defaultLayout: 'layout',        //set layout file as layout.hbs
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', async (req, res) => {     //async function
    // let data = await getWeather();  //wait for getWeather() function to run and store in variable

    // let description = data.weather[0].description    //prints light rain
    //  let city = data.name                     //prints London
    // // let humidity = data.main.humidity          //prints humidity
    // // let country = data.sys.country          //prints country
    // let temp = data.main.temp         //prints temp


    // res.render('index', {temp, description, city});        //render the index.hbs page

    res.render('index');
});

app.post('/', async (req, res) => {
    let location = req.body.location;
    let countryCode = req.body.countryCode;
    console.log(location);
    console.log(countryCode);

    let data = await getWeather(location, countryCode);         //pass in location and country code from getWeather.js
    console.log(data);

    let city = data.name
    let country = data.sys.country
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    

    res.render('index', { data: { city, country, temp, humidity } });
})

app.listen(3007, () => {
    console.log('server listening on port 3007');
});