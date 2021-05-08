function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthsIndex = date.getMonth();
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
  let currentDate = date.getDate();

  let day = days[dayIndex];
  let month = months[monthsIndex];
  return `${day} ${month}, ${currentDate}`;
}

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
        `
        <div class="col-2">
          <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }.png"
            alt=""
            width="42"
          />
          <div class="forecast-temperatures">
            <span class="forecast-temperature-max"> 🔺${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="forecast-temperature-min"> 🔻${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Feature #2 Weather Conditions (city, temperature, humidity, wind, current location)

function getForecast(coordinates) {
  let apiKey = "b34590da8d3becea16a03bf40d7216f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "b34590da8d3becea16a03bf40d7216f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "b34590da8d3becea16a03bf40d7216f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Feature #1 Date and Time
let dateElement = document.querySelector("#date");
let timeElement = document.querySelector("#time");
let currentTime = new Date();

timeElement.innerHTML = formatTime(currentTime);
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Essen");

//Feature #3 Celsius to Fahrenheit

// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
// }

// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }

//let celsiusTemperature = null;

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);
