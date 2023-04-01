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
]; //from 0 to 6

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

//  Bonus Feature (week 4)🔽 - Temperature conversion (now my conversion doesn't work, it needs to be corrected and finalized)

function displayTemp(event) {
  event.preventDefault();

  let temperatureC = ((temperatureF - 32) * 5) / 9;

  let temperatureF = (temperatureC * 9) / 5 + 32;

  let linkC = document.querySelector("#celsius-link");

  let linkF = document.querySelector("#fahrenheit-link");

  if ("click" === linkC) {
    //currentTemperature = ((temperatureF - 32) * 5) / 9;
    currentTemperature.innerHTML = temperatureC;
  } else {
    //currentTemperature = (temperatureC * 9) / 5 + 32;
    currentTemperature.innerHTML = temperatureF;
  }
}

let currentTemperature = document.querySelector("#current-temperature");

currentTemperature.addEventListener("click", displayTemp);
