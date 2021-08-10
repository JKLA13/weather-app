//declare variables

var citySearch = $("#searchBar").val();
var keyApi = "";

//create functions for:
//ajax API
//create elements, append to section for today's forecast
// function currentWeather () {}
//ajax API
//create elements, append to setcion for 5 day forecast

//listen event on search btn

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  $("#h5cast").addClass("show");
  var urlApi =
    "api.openweathermap.org/data/2.5/weather?q=" +
    citySearch +
    "&appid" +
    keyApi;
  citySearch = $("#searchBar").val();

  $.ajax({
    url: urlApi,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});
