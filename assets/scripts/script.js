var apiKey = "4a29cf0c04950e957247f8b23be385fd";

function displayCurrentWeather(temp, humidity, windSpeed){
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
            displayCurrentWeather(temp, humidity, windSpeed);
            getForecast(lat, lon);
            });
        } else {
            alert("Error: " + response.statusText);
          }
    });
}

function getForecast(lat, lon){
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            });
        } else {
            alert("Error: " + response.statusText);
          }
    });
}

function getCoordinates(city) {
  // format the weather api url
  
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