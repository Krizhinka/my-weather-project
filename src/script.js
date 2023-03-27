// My tasks for weeks 2, 3🔽

let cities = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter the city name");

city = city.trim();

city = city.toLowerCase();

if (cities[city] !== undefined) {
  let tempC = Math.round(cities[city].temp);

  let tempF = Math.round((cities[city].temp * 9) / 5 + 32);

  alert(
    `It is currently ${tempC}°C/${tempF}°F in ${city} with humidity of ${cities[city].humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}

//  Feature 1 (week 4)🔽

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

let currentHours = now.getHours();

let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();

let currentMinutes = now.getMinutes();

let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

let currentDayTime = document.querySelector("#current-day-time");

currentDayTime.innerHTML = `${day}  ${hours}:${minutes}`;

//  Feature 2(week4)🔽  +  My task (week 5)🔽 + Bonus point🔽

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
  )} km/h`;

  // let temperature = Math.round(response.data.main.temp);

  //let temperatureElement = document.querySelector("#current-temperature");

  //temperatureElement.innerHTML = temperature;
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

//  Bonus Feature🔽 - temperature conversion (now my conversion doesn't work, it need to correct and finalize)

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
