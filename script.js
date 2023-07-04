import Data from "./config.js";

const searchBar = document.querySelector('#searchBar');
const container = document.querySelector(".container");
const cityNameContainer = document.querySelector('.city-name');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const createAndAppendElement = (elementType, parentElement, className) => {
    const element = document.createElement(elementType);
    if (className) {
      element.classList.add(className);
    }
    parentElement.appendChild(element);
    return element;
  };

// Event will start on a keyup action
searchBar.addEventListener('keyup', async (event) => {
  // checking the action for specific key (Enter)
  if (event.key === "Enter") {
    // Store target in variable
    const thisCity = event.target.value.toLowerCase();
    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + thisCity + "&appid=" + Data.key;
    event.currentTarget.value = '';

    try {
      // Fetching first api to get the City coordinates
      const response = await fetch(apiUrl);
      const data = await response.json();

      const lon = data.city.coord.lon;
      const lat = data.city.coord.lat;

      cityNameContainer.innerHTML = data.city.name;

      // Fetching final data according to the coordinates
      const finalResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=${Data.key}`);
      const result = await finalResponse.json();

      console.log(result);

      // Removing all child elements from Container before creating a new set of elements
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Looping through 5 days of weather data
      for (let i = 0; i < 5; i++) {
        // Use the remainder operator (%) to switch from Saturday (last in the array) back to Sunday (first in the array)
        const currentDate = new Date();
        let dayOfTheWeek = weekdays[(currentDate.getDay() + i) % 7];
        const weatherData = result.list[i];
        console.log(weatherData);

        // Create the elements with Data
        const card = createAndAppendElement("div", container, "card");

        const imageBox = createAndAppendElement("div", card, "imgBx");
        const cardImg = createAndAppendElement("img", imageBox, "");
        cardImg.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

        const contentBox = createAndAppendElement("div", card, "contentBx");
        const cardHeader = createAndAppendElement("h2", contentBox, "");
        cardHeader.innerHTML = dayOfTheWeek;

        const tempDescription = createAndAppendElement("h4", contentBox, "");
        tempDescription.innerHTML = weatherData.weather[0].description;

        const currentTempBox = createAndAppendElement("div", contentBox, "color");
        const currentTempHeader = createAndAppendElement("h3", currentTempBox, "");
        currentTempHeader.innerHTML = "Temp:";

        const currentTemp = createAndAppendElement("span", currentTempBox, "current-temp");
        currentTemp.innerHTML = `${weatherData.main.temp}°C`;

        const minMaxTemperatures = createAndAppendElement("div", contentBox, "details");
        const minMaxTempHeader = createAndAppendElement("h3", minMaxTemperatures, "");
        minMaxTempHeader.innerHTML = "More:";

        const minTemp = createAndAppendElement("span", minMaxTemperatures, "min-temp");
        minTemp.innerHTML = `${weatherData.main.temp_min}°C`;

        const maxTemp = createAndAppendElement("span", minMaxTemperatures, "max-temp");
        maxTemp.innerHTML = `${weatherData.main.temp_max}°C`;
      }
    } catch (error) {
      // If there are errors, send out an error message
      console.error('Error:', error);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      alert("Error occurred. Please try again.");
    }
  }
});
