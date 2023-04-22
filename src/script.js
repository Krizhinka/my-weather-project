let now = new Date();

let currentDay = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
]; // from 0 to 6

let day = days[now.getDay()];

let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDayTime = document.querySelector("#current-day-time");

currentDayTime.innerHTML = `${day}  ${hours}:${minutes}`;

function search(city) {
  let units = "metric";

  let apiKey = "c819171fe0abdc14039af4ef5dda283b";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showCityTemperature(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1");

  let cityName = document.querySelector("#city-name-input").value;

  h1.innerHTML = cityName;

  let apiKey = "c819171fe0abdc14039af4ef5dda283b";

  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);

  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity - ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind - ${Math.round(
    response.data.wind.speed
  )} m/s`;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;

  let lon = position.coords.longitude;

  let units = "metric";

  let apiKey = "c819171fe0abdc14039af4ef5dda283b";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", showCityTemperature);

let currentButton = document.querySelector("#current-button");

currentButton.addEventListener("click", getCurrentLocation);

function getForecast(coordinates) {
  console.log(coordinates);

  let units = "metric";

  let apiKey = "c819171fe0abdc14039af4ef5dda283b";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    // from 0 to 7
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                        <div class="weather-forecast-date">
                            ${formatDay(forecastDay.dt)}
                        </div>
                        <img src="https://openweathermap.org/img/wn//${
                          forecastDay.weather[0].icon
                        }@2x.png" alt="" width="80" />
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-min">${Math.round(
                              forecastDay.temp.min
                            )}° </span>
                            <span class="weather-forecast-temperature-max">${Math.round(
                              forecastDay.temp.max
                            )}° </span>
                        </div>
                    </div>
       `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  console.log(forecastHTML);
}

search("Kyiv");
