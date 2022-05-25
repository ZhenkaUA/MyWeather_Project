let now = new Date();
function formatTime(currentTime) {
  let time = document.querySelector("div.time");

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `Current time: <strong>${hours}:${minutes}</strong>`;
}
formatTime(now);

let currentTime = new Date();
function formatDate(date) {
  let nowDay = document.querySelector("#currentDay");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  nowDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;
}
formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector("#city_search").innerHTML = response.data.name;
  let tempSearch = document.querySelector("#temp_search");
  let tempS = Math.round(response.data.main.temp);
  tempSearch.innerHTML = `${tempS}℃`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  let humSearch = document.querySelector("#humidity");
  let humS = response.data.main.humidity;
  humSearch.innerHTML = `Humidity: ${humS}%`;

  let windSearch = document.querySelector("#wind");
  let windS = Math.round(response.data.wind.speed);
  windSearch.innerHTML = `Wind: ${windS}km/h`;
}

function searchCity(city) {
  let apiKey = "ffb37bb079f89642552be499c34ff319";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "ffb37bb079f89642552be499c34ff319";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", handleSubmit);
searchCity();

let currentLocationButton = document.querySelector("#current-Location-Button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity();
