export const clearContainer = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };
  
  export const fetchWeatherData = (url, container) => {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
        clearContainer(container);
        alert("Are you sure you aren't holding your map upside down?");
      });
  };
  
  export const createWeatherCard = (day, data, container) => {
    const cardContent = `
      <div class="card">
          <div class="imgBx">
              <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
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
      </div>`;
    container.innerHTML += cardContent;
  };
  
  export const processWeatherData = (data, container, weekdays) => {
    clearContainer(container);
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      const dayOfTheWeek = weekdays[(date.getDay() + i) % 7];
      createWeatherCard(dayOfTheWeek, data.daily[i], container);
    }
  };
  