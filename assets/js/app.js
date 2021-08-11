//declare global variables
//login key for api added

var keyApi = "&appid=b6145ae695bfe33643e2f7c034c3dab0";

//need to create/append user search list

// $(".user-history").function(searchHistory)
// function populateHistory(citySearch) {
//   var searchHistory = $("<li>").addClass("list-group-item").text(citySearch);
//   $(".list").append(searchHistory);
//   var searchResult = response.list;
// }

//create functions for today cast and 5 day cast

function todayCast(response) {
  //     // jQuery manip DOM, create elements
  console.log(response);
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
  var todayTemp = $("<h2>").addClass("today-temp").text(response.main.temp);
  var createCard = $("<div>").addClass("card");
  var createCardBody = $("<div>").addClass("card-body");

  //append elements
  $("#todayCast").append(citySearch);
  citySearch.append(citySearch, userDate, conditionIcon, todayTemp);
  createCard.append(createCard, createCardBody);

  console.log(citySearch, userDate, conditionIcon, todayTemp);
  console.log(createCard, createCardBody);
}

//create function for elements, append to setcion for 5 day forecast
// for loop (or .each jQuery) for today's date i++ <=5?????

// function fiveCast() {
//

//   for (var i = 0; i < searchResult.length; i++) {
//     var date5Cast = Number(searchResult[i].text.split("-")[2].split("")[0]);

// $("#h5cast").addClass("show");
//   }
// }

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
    // console.log(response);
    // populateHistory(response);
    todayCast(response);

    // console.log(searchHistory);
  });
});
