const inputbox = document.querySelector(".search-box input");
const temperature = document.querySelector(".temperature");

const description = document.querySelector(".description");

const weatherimg = document.querySelector(".weather-img");

const humidity = document.querySelector("#humidity");

const wind = document.querySelector("#wind");
const btn = document.querySelector(" button");
const notfound = document.querySelector(".not-found");
const weather_body = document.querySelector(".weather-body");
const container = document.querySelector(".container");

async function checkWeather(city) {
  const api_key = "ed8c7d8b06534fba9a295315240109";
  const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`;

  const response = await fetch(url);

  const weather_data = await response.json();
  console.log(weather_data);

  if (weather_data.error) {
    notfound.style.display = "flex";
    weather_body.style.display = "none";
    container.style.backgroundImage = "url('/image/errorbg.jpg')";
    return;
  }
  notfound.style.display = "none";
  weather_body.style.display = "flex";
  container.style.backgroundImage = "url('/image/back1.jpg')";

  temperature.innerHTML = `${weather_data.current.temp_c}°C`;
  description.innerHTML = `${weather_data.current.condition.text}`;
  humidity.innerHTML = `${weather_data.current.humidity}%`;
  wind.innerHTML = `${weather_data.current.wind_mph}km/H`;

  const localHour = new Date(weather_data.location.localtime).getHours();
  if (localHour >= 6 && localHour < 18) {
    day(weather_data);
  } else {
    night(weather_data);
  }
}

const day = (weather_data) => {
  temperature.style.color = "black";
  description.style.color = "black";
  switch (weather_data.current.condition.text) {
    case "Clouds":
      weatherimg.src = "/image/cloud.png";
      break;
    case "Sunny":
      weatherimg.src = "/image/sun.png";
      break;
    case "Mist":
      weatherimg.src = "/image/mist.png";
      break;
    case "Rain":
      weatherimg.src = "/image/rain.png";
      break;
    case "Snow":
      weatherimg.src = "/image/snow.png";
      break;
    default:
      weatherimg.src = "/image/sky2.png"; // Optional: A default image if none of the cases match
      break;
  }
};

const night = (weather_data) => {
  notfound.style.display = "none";
  weather_body.style.display = "flex";
  container.style.backgroundImage = "url('/image/nightbg.jpg')";
  temperature.style.color = "#fff";
  description.style.color = "#fff";
  // humidity.style.color = "#273c75";
  // wind.style.color = "#273c75";

  switch (weather_data.current.condition.text) {
    case "Clouds":
      weatherimg.src = "/image/cloudnight.png";
      break;
    case "Clear":
      weatherimg.src = "/image/night.png";
      break;
    case "Mist":
      weatherimg.src = "/image/mist.png";
      break;
    case "Rain":
      weatherimg.src = "/image/rain.png";
      break;
    case "Snow":
      weatherimg.src = "/image/snow.png";
      break;
    default:
      weatherimg.src = "/image/nightsky.png"; // Optional: A default image if none of the cases match
      break;
  }
};

btn.addEventListener("click", () => {
  checkWeather(inputbox.value);
});
