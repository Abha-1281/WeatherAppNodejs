const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let today = new Date();
let options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};

let day = today.toLocaleDateString("en-US", options);

app.get("/", function(req, res) {

  res.render("list", {
    city: null,
    des: null,
    temp: null,
    icon: null,
    country: null,
    bg: null,
    pressure: null,
    humidity: null,
    wind: null,
    kindofday: day

  });

});

app.get("/weather", function(req, res) {
  res.send("This is weather end point");
});

app.get("*", function(req, res) {
  res.send("Page not found");
});


app.post("/", function(req, res) {
  const city = req.body.city;
  const apikey = "YOUR API KEY GOES HERE";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + unit;


  try {
    https.get(url, function(response) {
      console.log(response.statusCode);
      response.on("data", function(data) {
        const weatherdata = JSON.parse(data);
        if (weatherdata.message === "city not found") {
          res.render("list", {
            city: weatherdata.message,
            des: null,
            temp: null,
            icon: null,
            country: null,
            bg: null,
            pressure: null,
            humidity: null,
            wind: null,
            kindofday: day

          });
        } else {
          const city = weatherdata.name;
          const des = weatherdata.weather[0].description;
          const temp = weatherdata.main.temp;
          const icon = weatherdata.weather[0].icon;
          const country = weatherdata.sys.country;
          const pressure = weatherdata.main.pressure;
          const humidity = weatherdata.main.humidity;
          const wind = weatherdata.wind.speed;

          let bgimg = "";

          switch (String(icon)) {
            case "10d":
            case "10n":
              bgimg = "rain.jpg";
              console.log(bgimg);
              break;
            case "01d":
            case "01n":
              bgimg = "clearsky.jpg";
              console.log(bgimg);
              break;
            case "13d":
            case "13n":
              bgimg = "snow.jpg";
              console.log(bgimg);
              break;
            case "11d":
            case "11n":
              bgimg = "thunder.jpg";
              console.log(bgimg);
              break;
            case "09d":
            case "09n":
              bgimg = "drizzle.jpg";
              console.log(bgimg);
              break;
            case "50d":
            case "50n":
              bgimg = "mist.jpg";
              console.log(bgimg);
              break;
            case "02d":
            case "02n":
            case "03d":
            case "03n":
            case "04d":
            case "04n":
              bgimg = "cloudy.jpg";
              console.log(bgimg);
              break;

            default:
              console.log("error");

          }


          res.render("list", {
            city: city,
            des: des,
            temp: temp,
            icon: icon,
            country: country,
            bg: bgimg,
            pressure: pressure,
            humidity: humidity,
            wind: wind,
            kindofday: day

          });
        };
      });
    });
  } catch (err) {
    res.render("list", {
      city: "Something went wrong",
      des: null,
      temp: null,
      icon: null,
      country: null,
      bg: null,
      pressure: null,
      humidity: null,
      wind: null,
      kindofday: day

    });
  }
});


app.listen(3000, function() {
  console.log("Server is working on port 3000");
});
