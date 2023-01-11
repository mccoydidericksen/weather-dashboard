var apiKey = "4a29cf0c04950e957247f8b23be385fd";

function displayCurrentWeather(temp, humidity, windSpeed, icon){
    var currentIconEl = document.querySelector("#current-weather-icon");
    currentIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + icon + ".png");
    var currentTempEl = document.querySelector("#current-temp");
    currentTempEl.textContent = "Temperature: " + temp + "°F";
    var currentHumidityEl = document.querySelector("#current-humidity");
    currentHumidityEl.textContent = "Humidity: " + humidity + "%";
    var currentWindSpeedEl = document.querySelector("#current-wind");
    currentWindSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";
    var currentDateEl = document.querySelector("#current-date");
    currentDateEl.textContent = dayjs().format("MM/DD/YYYY");
    var currentCityEl = document.querySelector("#city-name");
    currentCityEl.textContent = "New York";
}

function displayForecast(forecastList){
    var dayCounter = 0;
    for(var i = 0; i < forecastList.length; i++) {
        if(forecastList[i].dt_txt.includes("15:00:00") && !forecastList[i].dt_txt.includes([dayjs().format("YYYY-MM-DD")])){
            var forecastDate = forecastList[i].dt_txt;
            var forecastTemp = forecastList[i].main.temp;
            var forecastHumidity = forecastList[i].main.humidity;
            var forecastWind = forecastList[i].wind.speed;
            var forecastIcon = forecastList[i].weather[0].icon;
            var forecastDateEl = document.querySelector("#date-" + dayCounter);
            forecastDateEl.textContent = dayjs(forecastDate).format("MM/DD/YYYY");
            var forecastTempEl = document.querySelector("#temp-" + dayCounter);
            forecastTempEl.textContent = "Temp: " + forecastTemp + "°F";
            var forecastHumidityEl = document.querySelector("#humidity-" + dayCounter);
            forecastHumidityEl.textContent = "Humidity: " + forecastHumidity + "%";
            var forecastWindEl = document.querySelector("#wind-" + dayCounter);
            forecastWindEl.textContent = "Wind: " + forecastWind + " MPH";
            var forecastIconEl = document.querySelector("#weather-icon-" + dayCounter);
            forecastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + forecastIcon + ".png");
            dayCounter++;
        }
    }
    if(dayCounter !== 5){
        var forecastDate = forecastList[forecastList.length - 1].dt_txt;
        var forecastTemp = forecastList[forecastList.length - 1].main.temp;
        var forecastHumidity = forecastList[forecastList.length - 1].main.humidity;
        var forecastWind = forecastList[forecastList.length - 1].wind.speed;
        var forecastIcon = forecastList[forecastList.length - 1].weather[0].icon;
        var forecastDateEl = document.querySelector("#date-" + dayCounter);
        forecastDateEl.textContent = dayjs(forecastDate).format("MM/DD/YYYY");
        var forecastTempEl = document.querySelector("#temp-" + dayCounter);
        forecastTempEl.textContent = "Temp: " + forecastTemp + "°F";
        var forecastHumidityEl = document.querySelector("#humidity-" + dayCounter);
        forecastHumidityEl.textContent = "Humidity: " + forecastHumidity + "%";
        var forecastWindEl = document.querySelector("#wind-" + dayCounter);
        forecastWindEl.textContent = "Wind: " + forecastWind + " MPH";
        var forecastIconEl = document.querySelector("#weather-icon-" + dayCounter);
        forecastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + forecastIcon + ".png");
    }
}

function getWeather(lat, lon){
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var icon = data.weather[0].icon;
            displayCurrentWeather(temp, humidity, windSpeed, icon);
            getForecast(lat, lon);
            });
        } else {
            alert("Error: " + response.statusText);
          }
    });
}

function getForecast(lat, lon){
    // format the forecast api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey; 
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            var forecastList = data.list;
            displayForecast(forecastList);
            });
        } else {
            alert("Error: " + response.statusText);
          }
    });
}

function getCoordinates(city) {
  // format the coordinates api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
  // make a request to the url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getWeather(lat, lon);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

getCoordinates("New York");