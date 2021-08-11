//declare variables

// for loop (or .each jQuery) for today's date i++ <=5?????

//login key for api needed???
var keyApi = "&appid=b6145ae695bfe33643e2f7c034c3dab0";

//need to create/append user search list

// $(".user-history").function(searchHistory)
function populateHistory() {
  var searchHistory = $("<li>").addClass("list-group-item").text(citySearch);
  $(".list").append(searchHistory);
  var searchResult = response.list;
}

//create functions for:
//ajax API
//create elements, append to section for today's forecast
// $("#todayCast").
function todayCast() {
  //     //manip DOM, create elements

  citySearch = $("<h3>").addClass("todayCard").text(response.name);
  var userDate = new Date();
  userDate = $("<h3>").addClass("todayCard").text(date.toLocaleString("en-US"));
  var conditionIcon = $("<img>").toLocaleString(
    "src",
    "https://openweathermap.org/img/w/" + weather[0].icon + "png"
  );
  var todayTemp = $("<h2>").addClass("today-temp").text(Temperature);
  var createCard = $("<div>").addClass("card");
  var createCardBody = $("<div>").addClass("card-body");

  //append elements
  citySearch.append(citySearch, userDate, conditionIcon, todayTemp);
  createCard.append(createCard, createCardBody);

  console.log(citySearch, userDate, conditionIcon, todayTemp);
  console.log(createCard, createCardBody);
}
//ajax API
//create elements, append to setcion for 5 day forecast

function fiveCast() {
  for (var i = 0; i < searchResult.length; i++) {
    var date5Cast = Number(searchResult[i].text.split("-")[2].split("")[0]);
  }
}

//listen event on search btn

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var citySearch = $("#searchBar").val();
  // $("#h5cast").addClass("show");
  var urlApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + keyApi;

  $.ajax({
    url: urlApi,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    populateHistory();

    console.log(searchHistory);
  });
});
