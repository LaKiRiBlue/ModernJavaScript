import { clearContainer, fetchWeatherData, createWeatherCard, processWeatherData } from "./utils.mjs";
import Data from "./config.mjs";

const searchBar = document.querySelector('#searchBar');
const container = document.querySelector(".container");
const cityNameContainer = document.querySelector('.city-name');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

searchBar.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const city = event.target.value.toLowerCase();
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${Data.key}`;
    event.currentTarget.value = "";

    fetchWeatherData(apiUrl, container)
      .then((data) => {
        const lon = data.city.coord.lon;
        const lat = data.city.coord.lat;
        cityNameContainer.innerHTML = data.city.name;

        const finalUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=${Data.key}`;
        return fetchWeatherData(finalUrl, container);
      })
      .then((data) => {
        console.log(
          "Welcome to this basic weather app. this is not a product but the product of an academic exercise."
        );
        processWeatherData(data, container, weekdays);
      });
  }
});
