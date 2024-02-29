import { fetchWeather } from "./api.js";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

async function handleSearch() {
  const city = searchInput.value;
  try {
    const data = await fetchWeather(city);
    displayWeather(data);
  } catch (error) {
    console.error("Ошибка проверки погоды:", error);
    showError();
  }
}

function showError() {
  errorContainer.style.display = "block";
  weatherContainer.style.display = "none";
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  document.querySelector(".city").textContent = name;
  document.querySelector(".temp").textContent = `${Math.round(main.temp)}°c`;
  document.querySelector(".humidity").textContent = `${main.humidity}%`;
  document.querySelector(".wind").textContent = `${wind.speed} км/ч`;

  switch (weather[0].main) {
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
