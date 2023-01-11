var apiKey = "4a29cf0c04950e957247f8b23be385fd";

function getCoordinates(city) {
  // format the weather api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;

      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

getWeather("New York");