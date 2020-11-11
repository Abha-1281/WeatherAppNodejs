# WeatherAppNodejs
A weather web app made using Node.js, Express and Open Weather Map API used for obtaining temperature of a particular city.

## Prerequisites
* You need to have NodeJS installed in your machine.
* You need to have an API Key. Head on over to OpenWeatherMap website to get an API key.

## Getting started on local
* Clone the repository
* `npm install` to install all required dependencies

## Set your API Key (Required)

```
app.post("/", function(req,res){

  const apikey = "YOUR API KEY GOES HERE";
  
  const unit ="metric";

});

```

### Unit Options(Optional, Kelvin by default) :
- imperial
- metric

## Run in Local Environment
Run the following command to run the application in local development server.

`node app.js`

Open the application in browser: http://localhost:3000.

## Dependencies
- NodeJS - Javascript runtime environment
- Express - NodeJS web framework
- OpenWeatherAPI - Data API

