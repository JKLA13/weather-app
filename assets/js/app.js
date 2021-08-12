//declare global variables
//login key for api added

var keyApi = "&appid=b6145ae695bfe33643e2f7c034c3dab0";

//need to create/append user search list

function showHistory() {
  var history = localStorage.getItem("weatherHistory").split(",");
  for (var i = 0; i < history.length; i++) {
    console.log(history[i]);
    var showHistory = $("<li>").addClass("list-group-item").text(history[i]);
    $(".list").append(showHistory);
    showHistory = response.list;
  }
}

//create functions for today cast and 5 day cast

function todayCast(response) {
  //     // jQuery manip DOM, create elements
  var citySearch = $("<h3>").addClass("todayCard").text(response.name);
  var userDate = new Date();
  userDate = $("<h3>")
    .addClass("todayCard")
    .text(userDate.toLocaleString("en-US"));
  var conditionIcon = $("<img>");
  conditionIcon.attr(
    "src",
    "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
  );
  var tempFar = (response.main.temp - 273.15) * (9 / 5) + 32;
  var todayTemp = $("<h2>")
    .addClass("today-temp")
    .html(Math.round(tempFar) + " &#176; F");
  var todayHumidity = $("<p>")
    .addClass("today-humidity")
    .text("Humidity: " + response.main.humidity + "%");
  var todayWind = $("<p>")
    .addClass("today-wind")
    .text("Wind Speed: " + response.wind.speed + "MPH");
  var createCard = $("<div>").addClass("card");
  var createCardBody = $("<div>").addClass("card-body");

  //append elements
  $("#todayCast").empty();

  $("#todayCast").append(createCard);

  createCardBody.append(
    citySearch,
    userDate,
    conditionIcon,
    todayTemp,
    todayHumidity,
    todayWind
  );
  createCard.append(createCardBody);
}

//create function for elements, append to setcion for 5 day forecast

function fiveCast(results) {
  $("#extendedCast").empty();
  // for loop (or .each jQuery) for today's date i++
  for (var i = 0; i < results.length; i++) {
    var timeSplit = results[i].dt_txt.split(" ");
    var newDate = timeSplit[0].split("-");
    var formattedDate = newDate[1] + "/" + newDate[2] + "/" + newDate[0];
    userDate = $("<h4>").text(formattedDate);
    var conditionIcon = $("<img>");
    conditionIcon.attr(
      "src",
      "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png"
    );
    var tempFar = (results[i].main.temp - 273.15) * (9 / 5) + 32;
    var todayTemp = $("<h5>")
      .addClass("today-temp")
      .html(Math.round(tempFar) + " &#176; F");
    var fiveHumidity = $("<p>")
      .addClass("five-humidity")
      .text("Humidity: " + results[i].main.humidity + "%");
    var fiveWind = $("<p>")
      .addClass("five-wind")
      .text("Wind Speed:" + results[i].wind.speed + "MPH");
    var createCard = $("<div>").addClass("card");
    var createCardBody = $("<div>").addClass("card-body");

    //append elements

    $("#extendedCast").append(createCard);

    createCardBody.append(
      userDate,
      conditionIcon,
      todayTemp,
      fiveHumidity,
      fiveWind
    );
    createCard.append(createCardBody);
  }
}

//listen event on search btn

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var citySearch = $("#searchBar").val();

  var urlApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + keyApi;

  $.ajax({
    url: urlApi,
    method: "GET",
  }).then(function (response) {
    todayCast(response);

    if (localStorage.getItem("weatherHistory") === null) {
      localStorage.setItem("weatherHistory", response.name);
    } else {
      var storedCities = localStorage.getItem("weatherHistory");
      localStorage.setItem(
        "weatherHistory",
        storedCities + "," + response.name
      );
    }
    showHistory();
  });
  urlApi =
    "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + keyApi;

  $.ajax({
    url: urlApi,
    method: "GET",
  }).then(function (response) {
    var results = [];
    $.each(response.list, function (index, value) {
      if (value.dt_txt.indexOf("06:00:00") >= 0) {
        results.push(value);
      }
    });
    fiveCast(results);
  });
});
