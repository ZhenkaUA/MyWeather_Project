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
  time.innerHTML = `<strong>${hours}:${minutes}</strong>`;
}
formatTime(now);

let currentTime = new Date();
function formatDate(date) {
  let nowDay = document.querySelector("#currentDay");
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-md-2"><div class="day">${formatDay(
          forecastDay.dt
        )}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="icon_weather_forecast" alt="" />
            <div class="temp-max">${Math.round(
              forecastDay.temp.max
            )}° <span class="temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span></div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ffb37bb079f89642552be499c34ff319";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayWeatherCondition(response) {
  document.querySelector("#city_search").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let tempSearch = document.querySelector("#temp_search");
  tempSearch.innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  let humSearch = document.querySelector("#humidity");
  let humS = response.data.main.humidity;
  humSearch.innerHTML = `Humidity: ${humS}%`;

  let windSearch = document.querySelector("#wind");
  let windS = Math.round(response.data.wind.speed);
  windSearch.innerHTML = `Wind: ${windS}km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "ffb37bb079f89642552be499c34ff319";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp_search");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp_search");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-Location-Button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
