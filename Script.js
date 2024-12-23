// API Key from OpenWeatherMap
const API_KEY = "4ae260e9f35dfe0a87037fdd5f5c4030"; // Replace with your OpenWeatherMap API key

// Elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");

// Event Listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    // Check if input is empty
    if (!city) {
        cityInput.placeholder = "Please enter a city name";
        cityInput.classList.add("error");
        return;
    }

    cityInput.classList.remove("error"); // Remove error class if input is valid
    fetchWeather(city);
});

// Fetch Weather Data
async function fetchWeather(city) {
    // Show a loading spinner
    weatherInfo.innerHTML = "<div class='loading'></div>";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    } finally {
        // Remove the loading spinner
        weatherInfo.querySelector(".loading")?.remove();
    }
}

// Display Weather Data
function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    weatherDescription.textContent = `Description: ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Add fallback for weather icon
    weatherIcon.onerror = () => {
        weatherIcon.src = "default-icon.png"; // Replace with a local fallback image
    };

    // Append additional details
    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const wind = document.createElement("p");
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Clear previous additional details and append new ones
    weatherInfo.innerHTML = ""; 
    weatherInfo.appendChild(cityName);
    weatherInfo.appendChild(temperature);
    weatherInfo.appendChild(weatherDescription);
    weatherInfo.appendChild(weatherIcon);
    weatherInfo.appendChild(humidity);
    weatherInfo.appendChild(wind);

    weatherInfo.classList.remove("hidden");
}

// Display Error Messages
function showError(message) {
    weatherInfo.innerHTML = `<p class="error-message">${message}</p>`;
}
