// WEATHER APP  
// These are the packages we will use for our application
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

// here we created our route for URL to Page.html
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/page.html");
});

// Here we will implement our API CALL to our URL

app.post("/", function(req,res){
    const cityName = req.body.cityName;
    let lat = '';
    let lon = '';
    const url2 = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},US&appid=8c233e08a621c3787af9afbc672e7c83`;
    https.get(url2,function(response){
        response.on("data", function (data){
            const jsondata2 = JSON.parse(data);
            console.log(jsondata2)
            lat = jsondata2[0].lat;
            lon = jsondata2[0].lon;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8c233e08a621c3787af9afbc672e7c83&units=imperial`;
            https.get(url, function(response){
                response.on("data",function(data){
                    const jsondata = JSON.parse(data);
                    const temp = jsondata.main.temp;
                    const des = jsondata.weather[0].description;
                    const icon = jsondata.weather[0].icon;
                    const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                    const humidity = jsondata.main.humidity;
                    const wind = jsondata.wind.speed;
                    res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1><br>`);
                    res.write(`<p>The weather description is ${des}</p><br>`);
                    res.write(`<img src= ${imageurl}><br>`);
                    res.write(`<p>The Humidity is ${humidity}%</p><br>`)
                    res.write(`<p>The wind speed is ${wind}mph</p><br>`)
                });
            });
        });
    });
});

app.listen(9000);


