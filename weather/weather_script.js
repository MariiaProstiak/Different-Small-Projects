"use strict";

const weatherTab = document.querySelector("#weahter-widget");

//блок с погодой
const weatherBlock = document.querySelector("#weather");
let city = "Kyiv";

if (weatherBlock) {
  loadWeather();
}

function searchCity() {
  const searchInput = document.getElementById("city_search");
  city = searchInput.value;
  if (weatherBlock) {
    loadWeather();
  }
}

async function loadWeather(e) {
  weatherBlock.innerHTML = `
   <div class='weahter__loading'>
      <img src='../weather/loading.gif' alt='Loading...'>
   </div>`;

  console.log(city);
  const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=e3992adf8d9f0238496c86550cdcfa55`;
  const response = await fetch(server, { method: "GET" });

  const responseResult = await response.json();

  if (responseResult) {
    geatWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

function geatWeather(data) {
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
      <div class="weather__header">
            <div class="weather__main">
               <div class="weather__city">${location}</div>
               <div class="weather__status">${weatherStatus}</div>
            </div>
            <div class="weather__icon"><img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}"></div>
         </div>
         <div class="weather__temp">${temp}</div>
         <div class="weather__feels-like">Feels like: ${feelsLike}</div>
   `;

  weatherBlock.innerHTML = template;
}
