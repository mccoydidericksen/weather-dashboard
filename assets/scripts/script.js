var apiKey = "4a29cf0c04950e957247f8b23be385fd";
var searchButton = $(".btn");

function displaySearchHistory(){
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    var searchHistoryEl = document.querySelector("#search-history");
    searchHistoryEl.innerHTML = "";
    if(searchHistory){
        var keys = Object.keys(searchHistory);
        for(var i=0; i<keys.length; i++){
            var searchHistoryItemEl = document.createElement("li");
            searchHistoryItemEl.setAttribute("class", "list-group-item");
            searchHistoryItemEl.setAttribute("id", keys[i]);
            searchHistoryItemEl.textContent = keys[i];
            searchHistoryItemEl.classList.add("btn");
            searchHistoryItemEl.classList.add("btn-secondary");
            searchHistoryItemEl.classList.add("btn-block");
            searchHistoryItemEl.addEventListener("click", function(e){
                var city = e.target.id;
                var lat = searchHistory[city][0];
                var lon = searchHistory[city][1];
                getWeather(lat, lon, city);
            })
            searchHistoryEl.appendChild(searchHistoryItemEl);
        }
    }
}

function storeSearch(city, lat, lon){
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if(searchHistory){
        searchHistory[city] = [lat, lon];
    }
    else{
        searchHistory = {};
        searchHistory[city] = [lat, lon];
    }
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    displaySearchHistory();
}

function displayCurrentWeather(temp, humidity, windSpeed, icon, city){
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
    currentCityEl.textContent = city;
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

function getWeather(lat, lon, city){
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
            displayCurrentWeather(temp, humidity, windSpeed, icon, city);
            getForecast(lat, lon);
            storeSearch(city, lat, lon);
            });
        } else {
            $("#staticBackdropLabel").text("Error " + response.status);
            $(".modal-body").text("Please enter a valid city name.");
            $("#staticBackdrop").modal('show');
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
            var forecastList = data.list;
            displayForecast(forecastList);
            });
        } else {
            $("#staticBackdropLabel").text("Error " + response.status);
            $(".modal-body").text("Please enter a valid city name.");
            $("#staticBackdrop").modal('show');
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
        getWeather(lat, lon, city);
      });
    } else {
        $("#staticBackdropLabel").text("Error " + response.status);
        $(".modal-body").text("Please enter a valid city name.");
        $("#staticBackdrop").modal('show');
    }
  });
}


searchButton.on("click", function(event) {
    event.preventDefault();
    var city = $("#city").val();
    getCoordinates(city);
    $("#city").val("");
 });

 displaySearchHistory();
 getCoordinates("Salt Lake City");
