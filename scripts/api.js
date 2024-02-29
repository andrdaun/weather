import { apiKey, apiUrl } from "./config.js";

export async function fetchWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("Не удалось получить данные о погоде");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
    throw error;
  }
}
