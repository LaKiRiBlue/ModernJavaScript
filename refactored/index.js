import Data from "./config.js";

const searchBar = document.querySelector('#searchBar');
const container = document.querySelector(".container");
const cityNameContainer = document.querySelector('.city-name');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



const clearContainer = () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

const fetchWeatherData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error)
      clearContainer()
      alert("Are you sure you aren't holding your map upside down?")
    })
}

const createWeatherCard = (day, data) => {
  const cardContent = `
    <div class="card">
        <div class="imgBx">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        </div>
        <div class="contentBx">
            <h2>${day}</h2>
            <h4>${data.weather[0].description}</h4>
            <div class="color">
                <h3>Temp:</h3>
                <span class="current-temp">${data.temp.day}°C</span>
            </div>
            <div class="details">
                <h3>More:</h3>
                <span class="min-temp">${data.temp.min}°C</span>
                <span class="max-temp">${data.temp.max}°C</span>
            </div>
        </div>
    </div>`
  container.innerHTML += cardContent
}

const processWeatherData = (data) => {
  clearContainer()
  for (let i = 0; i < 5; i++) {
    const date = new Date()
    const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
    createWeatherCard(dayOfTheWeek, data.daily[i])
  }
}

searchBar.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const city = event.target.value.toLowerCase()
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${Data.key}`
    event.currentTarget.value = ""

    fetchWeatherData(apiUrl)
      .then((data) => {
        const lon = data.city.coord.lon
        const lat = data.city.coord.lat
        cityNameContainer.innerHTML = data.city.name

        const finalUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=${Data.key}`
        return fetchWeatherData(finalUrl)
      })
      .then((data) => {
        console.log(
          "Welcome to this basic weather app. this is not a product but the product of an academic exercise."
        )
        processWeatherData(data)
      })
  }
}
)