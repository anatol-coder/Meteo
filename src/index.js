function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = ` ${response.data.condition.description}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="weather-app-icon"/>`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "5b407712f11dct93a10f4f1dc8e2394o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
searchCity("London");
