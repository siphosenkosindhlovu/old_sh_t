$(document).ready(function () {
  var clouds = document.getElementsByClassName('cloud');
  var sky = document.querySelector(".sky");
  //var cloudDensity = Math.floor(Math.random() * 40);
  var ground = document.querySelector(".ground");
  var currentTime = new Date;
  var timeString = currentTime.getHours() + ":" + currentTime.getMinutes();
  var $temp = $('#temp'),
    $tempMax = $('#tempMax'),
    $tempMin = $('#tempMin'),
    $weatherIcon = $('#weatherIcon'),
    $weatherMain = $('#weatherMain'),
    $weatherDesc = $('#weatherDesc'),
    $displayContent = $('#displayContent'),
    $loader = $('#loader'),
    api = "http://api.openweathermap.org/data/2.5/weather\?",
    key = "&appid=979223e5411815d908c275a992b5c234",
    units = "&units=metric",
    geoip = "http://freegeoip.net/json/?q=";
  if (navigator.geolocation) {
    console.log('data');
    navigator.geolocation.getCurrentPosition(useGeoData, alternateData);
  } else {
    alternateData();
    console.log('no data');
  }

  function alternateData() {
    $.getJSON('https://api.ipify.org?format=json', function (json) {
      var ipaddr = json.id;
      $.getJSON(geoip + ipaddr, function (json1) {
        var lat = json1.latitude,
          lon = json1.longitude;
        var apiLocator = "lat=" + lat + "&" + "lon=" + lon;
        $.getJSON(api + apiLocator + units + key, getWeatherData);
      })
    })
  }

  function useGeoData(position) {
    console.log('located!')
    var lon = position.coords.longitude;
    var lat = position.coords.latitude;
    console.log(lon);
    var apiLocator = "lat=" + lat + "&" + "lon=" + lon;
    $.getJSON(api + apiLocator + units + key, getWeatherData);
  };

  function getWeatherData(json) {
    console.log(JSON.stringify(json));
    var sunriseTime = new Date(json.sys.sunrise * 1000),
      sunsetTime = new Date(json.sys.sunset * 1000),
      id = json.weather[0].id,
      temp = Math.round(json.main.temp),
      icon = json.weather[0].icon,
      main = json.weather[0].main,
      description = json.weather[0].description,
      clouds = json.clouds.all,
      rain = function () {
        if (json.rain["3h"] === undefined)
          return 0;
      },
      snow = function () {
        if (json.snow["3h"] === undefined)
          return 0;
      },
      sunrise = function () {
        var minutes = "";
        if (sunriseTime.getMinutes() < 10) {
          minutes = "0" + sunriseTime.getMinutes();
        } else {
          minutes = sunriseTime.getMinutes();
        }
        return sunriseTime.getHours() + ":" + minutes;
      },
      sunset = function () {
        var minutes = "";
        if (sunsetTime.getMinutes() < 10) {
          minutes = "0" + sunsetTime.getMinutes();
        } else {
          minutes = sunsetTime.getMinutes();
        }
        return sunsetTime.getHours() + ":" + minutes;
      },
      cityName = json.name + ", " + json.sys.country;
    var weatherApp = new Weather(
      json.sys.sunset * 1000,
      json.sys.sunrise * 1000,
      json.weather[0].main,
      json.weather[0].description,
      Math.round(json.main.temp),
      json.weather[0].id,
      json.clouds.all,
      rain,
      snow,
    );
    weatherApp.updateDOM();
    update(cityName, temp, icon, main, description, sunrise, sunset)
  }

  function update(cityName, temp, /* maxTemp, minTemp,*/ icon, main, description, sunrise, sunset) {
    var celsiusState = true,
      currentTemp = temp;

    //$location.html(cityName);
    $temp.html(currentTemp + ' <i class="wi wi-celsius"></i>');
    //$tempMax.css('font-size', '28px');
    //toggles Celsuis units. Ignore the name the function was repourposed
    /*$tempMax.on('click', function(){
      if(celsiusState === false){
        $temp.html(temp + '<i class="wi wi-celsius"></i>');
        celsiusState = true;
        $tempMax.css('font-size', '36px');
        $tempMin.css('font-size', '28px');
      }
    });*/
    //toggles Celsuis units. Ignore the name the function was repourposed
    /*$tempMin.on('click', function(){
      if(celsiusState){
        currentTemp = temp * 9/5 + 32;
        $temp.html(currentTemp + '<i class="wi wi-celsius"></i>');
        celsiusState = false;
        $tempMax.css('font-size', '28px');
        $tempMin.css('font-size', '36px');
      }
    });*/
    //$weatherIcon.html("<img src='http://openweathermap.org/img/w/" + icon + ".png'>");
    $weatherMain.html(main);
    $weatherDesc.html(description);

  };

  function Weather(sunset, sunrise, main, description, temp, id, cloudiness, rain, snow) {
    var Main = main;
    var Description = description;
    var Temp = temp
    var Id = id;
    var Cloudiness = cloudiness;
    var Rain = rain,
      Snow = snow;
    var Sunset = new Date(sunset),
      Sunrise = new Date(sunrise);
    this.updateDOM = function () {
      if (minutiser(currentTime) <= minutiser(Sunset) && minutiser(currentTime) >= minutiser(Sunrise)) {
        document.querySelector(".frame").style.background = "rgb(68, 219, 219)";
      } else {
        document.querySelector(".frame").style.background = "rgb(33, 47, 69)";
      }
      conditionProcessor(Id, Sunset, Sunrise);
      cloudSpewer(Cloudiness, Rain);
      treeSpewer();
    }
  };


  //var curee = new Weather();
  //curee.updateDOM();

  function conditionProcessor(identity, suns, sunr) {
    if (identity >= 701 && identity <= 800) {
      document.querySelector(".haze").style.display = "block";
    } else if (identity >= 200 && identity <= 321 || identity >= 511 && identity <= 622 || identity >= 802 && identity <= 804) {
      document.querySelector(".sun").style.display = "none";
      if (minutiser(currentTime) <= minutiser(suns) && minutiser(currentTime) >= minutiser(sunr)) {
        document.querySelector(".frame").style.background = "rgb(84, 98, 117)";
      }
    }
  };
  //this function is responsible for producing clouds.
  function cloudSpewer(cloudDensity, rainyness) {
    for (var i = 1; i <= cloudDensity; i++) {
      var cla = document.createElement("div");
      cla.classList.add("cloud");
      var clab = document.createElement("div");
      clab.classList.add("cloud_base");
      cla.appendChild(clab);
      cla.style.left = Math.round(Math.random() * 90) + "%";
      cla.style.top = Math.round(Math.random() * 100) + "%";
      cla.style.width = 20 + Math.random() * 40 + "%";
      cla.style.opacity = 1;
      cla.style.transitionDelay = (Math.random()).toFixed(2);
      sky.appendChild(cla);
      for (var j = 0; j < rainyness; j++) {
        rainmaker(cla);
      }
    };
  }



  function minutiser(time) {
    return (time.getHours() * 60) + time.getMinutes();
  }

  function treeSpewer() {
    for (var i = 0; i <= 10; i++) {
      var cla = document.createElement("div");
      cla.classList.add("tree");
      var clab = document.createElement("div");
      clab.classList.add("trunk");
      var can = document.createElement("div");
      can.classList.add("canopy");
      clab.appendChild(can);
      cla.appendChild(clab);
      cla.style.left = Math.round(Math.random() * 90) + "%";
      ground.appendChild(cla);
    }
  }


  function rainmaker(iyezi) {
    var drop = document.createElement("div");
    drop.classList.add("rain_drop");
    drop.style.animationDelay = Math.random() + "s";
    iyezi.appendChild(drop);
  };


})