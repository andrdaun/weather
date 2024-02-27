const apiKey = "3f93a75017900a6e7e45e568f8109032";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchInput.value);
  }
});

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    showError();
  } else {
    const data = await response.json();
    displayWeather(data);
  }
}

function showError() {
  errorContainer.style.display = "block";
  weatherContainer.style.display = "none";
}

function displayWeather(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent =
    Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " км/ч";

  switch (data.weather[0].main) {
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      break;
    case "Clear":
      weatherIcon.src = "images/clear.png";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      break;
    case "Drizzle":
      weatherIcon.src = "images/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "images/mist.png";
      break;
    default:
      weatherIcon.src = "";
  }

  errorContainer.style.display = "none";
  weatherContainer.style.display = "block";
}
