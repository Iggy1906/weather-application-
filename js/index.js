$(document).ready(function() {
  var long;

  var lat;

  var fTemp;
  var cTemp;
  var kTemp;

  var tempSwap = true;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      var api =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&APPID=a8a034b14f95da1be3a1b7cfeb45e75e";

      $.getJSON(api, function(data) {
        var weatherType = data.weather[0].description;
        kTemp = data.main.temp;
        var windSpeed = data.wind.speed;
        var city = data.name;
        

        //tempeture in kelvin
        fTemp = (kTemp * (9 / 5) - 459.67).toFixed(2);
        //Temp in F
        //City name
        cTemp = (kTemp - 273).toFixed(2);

        console.log(city);

        $("#city").html(city);
        $("#weatherType").html(weatherType);
        $("#fTemp").html(fTemp + "&#8457;");
        $("#fTemp").click(function() {
          if (tempSwap === false) {
            $("#fTemp").html(cTemp + "&#8451;");
            tempSwap = true;
          } else {
            $("#fTemp").html(fTemp + "&#8457;");
            tempSwap = false;
          }
        });

        windSpeed = (2.237 * windSpeed).toFixed(1);

        $("#windSpeed").html(windSpeed + "mph");
        if (fTemp > 80) {
          $("body").css("background-image", "url()");
        } else if (fTemp > 70) {
          $("body").css("background-image", "url()");
        }
      });
    });
  }
});
