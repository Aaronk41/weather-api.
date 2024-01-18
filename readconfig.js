const fs = require('fs');
const axios = require('axios');

// Read the configuration file
const rawConfig = fs.readFileSync('config.json');
const config = JSON.parse(rawConfig);
const apiKey = config.apiKey;
const city = config.city;

// Make an API request using axios
const getWeatherData = async () => {
  try {
    const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?q=Columbus&appid=4632dde2ac5e64ac96bbad9a1bf7dcf7'
    );

    // Log the entire response for inspection
    console.log('API Response:', response);

    const weatherData = response.data;

    // Display specific weather information
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    console.log(`Temperature: ${temperature}°C, Description: ${description}`);

    // Handle different weather conditions
    const weatherCondition = weatherData.weather[0].main;
    if (weatherCondition === 'Clear') {
      console.log('It is a clear day!');
    } else if (weatherCondition === 'Rain') {
      console.log('It is raining.');
    } else if (weatherCondition === 'Snow') {
      console.log('It is snowing.');
    } else if (weatherCondition === 'Thunderstorm') {
      console.log('Thunderstorms are expected.');
    } else if (weatherCondition === 'Tornado') {
      console.log('Tornado warning!');
    }

    // Additional weather elements
    const windSpeed = weatherData.wind.speed;
    console.log(`Wind Speed: ${windSpeed} m/s`);

    const humidity = weatherData.main.humidity;
    console.log(`Humidity: ${humidity}%`);

    // Check if snow is present
    if (weatherData.snow) {
      const snowVolume = weatherData.snow['1h']; // Snow volume in the last 1 hour
      console.log(`Snow Volume (1h): ${snowVolume} mm`);
    }

  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
};

getWeatherData();


