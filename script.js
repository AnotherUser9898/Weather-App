const input = document.querySelector(".search");
const button = document.querySelector(".search-button");
const forecastCards = document.querySelector(".scroll-container");
const dailyForecast = document.querySelector(".daily-forecast-group");
const celsiusButton = document.querySelector(".celsius-button");
const fahrenheitButton = document.querySelector(".fahrenheit-button");
const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let currentScale = "Celsius";
celsiusButton.style.cssText += "color: black; background-color: white;"
const startSearch = document.querySelector(".start-search");
const startSearchContainer = document.querySelector(".absolute-search-container");
const componentContainer = document.querySelector(".component-container");
const loadingContainer = document.querySelector(".loading-container");
const loadingMain = document.querySelector(".loading-main");
startSearch.addEventListener("click",async() => {
  try {
    const startSearchBar = document.querySelector(".start-search-bar");
    if (startSearchBar.value.length == 0) {
      alert("Please enter a city");
      return;
    }
    
    startSearchContainer.style.cssText += "display: none";
    loadingContainer.style.cssText += "display: flex";
    const weatherObject = await fetchData(startSearchBar.value);
    setUpPage(weatherObject);
    loadingContainer.style.cssText += "display:none";
    componentContainer.style.cssText += "display: grid";
  } catch(error) {
    console.log(error);
  }
  
})

function celsiusToFahrenheit(n) {
  return ((n * 9.0 / 5.0) + 32).toFixed(1);
}

function fahrenheitToCelsius(n) {
  return ((n - 32) * 5.0 / 9.0).toFixed(1);
}

const conditionArray = [
    {
        "code": 1000,
        "day": "Sunny",
        "night": "Clear",
        "icon": 113,
        "urlDay": "images/day/sunny.png",
        "urlNight": "images/night/clear.png",
      },
      {
        "code": 1003,
        "day": "Partly cloudy",
        "night": "Partly cloudy",
        "icon": 116,
        "urlDay": "images/day/cloudy.png",
        "urlNight": "images/night/cloudy-night.png",
      },
      {
        "code": 1006,
        "day": "Cloudy",
        "night": "Cloudy",
        "icon": 119,
        "urlDay": "images/day/cloudy.png",
        "urlNight": "images/night/cloudy-night.png",
      },
      {
        "code": 1009,
        "day": "Overcast",
        "night": "Overcast",
        "icon": 122,
        "urlDay": "images/day/overcast.png",
        "urlNight": "images/day/overcast.png",
      },
      {
        "code": 1030,
        "day": "Mist",
        "night": "Mist",
        "icon": 143,
        "urlDay": "images/day/mist.png",
        "urlNight": "images/night/mist-night.png",
      },
      {
        "code": 1063,
        "day": "Patchy rain possible",
        "night": "Patchy rain possible",
        "icon": 176,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1066,
        "day": "Patchy snow possible",
        "night": "Patchy snow possible",
        "icon": 179,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1069,
        "day": "Patchy sleet possible",
        "night": "Patchy sleet possible",
        "icon": 182,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1072,
        "day": "Patchy freezing drizzle possible",
        "night": "Patchy freezing drizzle possible",
        "icon": 185,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1087,
        "day": "Thundery outbreaks possible",
        "night": "Thundery outbreaks possible",
        "icon": 200,
        "urlDay": "images/day/thunderstorm.png",
        "urlNight": "images/day/thunderstorm.png",
      },
      {
        "code": 1114,
        "day": "Blowing snow",
        "night": "Blowing snow",
        "icon": 227,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1117,
        "day": "Blizzard",
        "night": "Blizzard",
        "icon": 230,
        "urlDay": "images/day/snow.png",
        "urlNightt": "images/day/snow.png",
      },
      {
        "code": 1135,
        "day": "Fog",
        "night": "Fog",
        "icon": 248,
        "urlDay": "images/day/mist.png",
        "urlNight": "images/night/mist-night.png",
      },
      {
        "code": 1147,
        "day": "Freezing fog",
        "night": "Freezing fog",
        "icon": 260,
        "urlDay": "images/day/mist.png",
        "urlNight": "images/night/mist-night.png",
      },
      {
        "code": 1150,
        "day": "Patchy light drizzle",
        "night": "Patchy light drizzle",
        "icon": 263,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",

      },
      {
        "code": 1153,
        "day": "Light drizzle",
        "night": "Light drizzle",
        "icon": 266,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1168,
        "day": "Freezing drizzle",
        "night": "Freezing drizzle",
        "icon": 281,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1171,
        "day": "Heavy freezing drizzle",
        "night": "Heavy freezing drizzle",
        "icon": 284,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1180,
        "day": "Patchy light rain",
        "night": "Patchy light rain",
        "icon": 293,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1183,
        "day": "Light rain",
        "night": "Light rain",
        "icon": 296,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1186,
        "day": "Moderate rain at times",
        "night": "Moderate rain at times",
        "icon": 299,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1189,
        "day": "Moderate rain",
        "night": "Moderate rain",
        "icon": 302,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1192,
        "day": "Heavy rain at times",
        "night": "Heavy rain at times",
        "icon": 305,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1195,
        "day": "Heavy rain",
        "night": "Heavy rain",
        "icon": 308,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1198,
        "day": "Light freezing rain",
        "night": "Light freezing rain",
        "icon": 311,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1201,
        "day": "Moderate or heavy freezing rain",
        "night": "Moderate or heavy freezing rain",
        "icon": 314,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1204,
        "day": "Light sleet",
        "night": "Light sleet",
        "icon": 317,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1207,
        "day": "Moderate or heavy sleet",
        "night": "Moderate or heavy sleet",
        "icon": 320,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1210,
        "day": "Patchy light snow",
        "night": "Patchy light snow",
        "icon": 323,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",

      },
      {
        "code": 1213,
        "day": "Light snow",
        "night": "Light snow",
        "icon": 326,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1216,
        "day": "Patchy moderate snow",
        "night": "Patchy moderate snow",
        "icon": 329,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1219,
        "day": "Moderate snow",
        "night": "Moderate snow",
        "icon": 332,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1222,
        "day": "Patchy heavy snow",
        "night": "Patchy heavy snow",
        "icon": 335,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1225,
        "day": "Heavy snow",
        "night": "Heavy snow",
        "icon": 338,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1237,
        "day": "Ice pellets",
        "night": "Ice pellets",
        "icon": 350,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1240,
        "day": "Light rain shower",
        "night": "Light rain shower",
        "icon": 353,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1243,
        "day": "Moderate or heavy rain shower",
        "night": "Moderate or heavy rain shower",
        "icon": 356,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1246,
        "day": "Torrential rain shower",
        "night": "Torrential rain shower",
        "icon": 359,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1249,
        "day": "Light sleet showers",
        "night": "Light sleet showers",
        "icon": 362,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1252,
        "day": "Moderate or heavy sleet showers",
        "night": "Moderate or heavy sleet showers",
        "icon": 365,
        "urlDay": "images/day/rainfall.png",
        "urlNight": "images/day/rainfall.png",
      },
      {
        "code": 1255,
        "day": "Light snow showers",
        "night": "Light snow showers",
        "icon": 368,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1258,
        "day": "Moderate or heavy snow showers",
        "night": "Moderate or heavy snow showers",
        "icon": 371,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1261,
        "day": "Light showers of ice pellets",
        "night": "Light showers of ice pellets",
        "icon": 374,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1264,
        "day": "Moderate or heavy showers of ice pellets",
        "night": "Moderate or heavy showers of ice pellets",
        "icon": 377,
        "urlDay": "images/day/snow.png",
        "urlNight": "images/day/snow.png",
      },
      {
        "code": 1273,
        "day": "Patchy light rain with thunder",
        "night": "Patchy light rain with thunder",
        "icon": 386,
        "urlDay": "images/day/thunderstorm.png",
        "urlNight": "images/day/thunderstorm.png",
      },
      {
        "code": 1276,
        "day": "Moderate or heavy rain with thunder",
        "night": "Moderate or heavy rain with thunder",
        "icon": 389,
        "urlDay": "images/day/thunderstorm.png",
        "urlNight": "images/day/thunderstorm.png",
      },
      {
        "code": 1279,
        "day": "Patchy light snow with thunder",
        "night": "Patchy light snow with thunder",
        "icon": 392,
        "urlDay": "images/day/thunderstorm.png",
        "urlNight": "images/day/thunderstorm.png",
      },
      {
        "code": 1282,
        "day": "Moderate or heavy snow with thunder",
        "night": "Moderate or heavy snow with thunder",
        "icon": 395,
        "urlDay": "images/day/thunderstorm.png",
        "urlNight": "images/day/thunderstorm.png",
      }
]

function toCelsius() {
  if (currentScale == "Celsius") {
    return;
  }
  currentScale = "Celsius";
  const temperatureList = document.querySelectorAll(".temperature-indicator");
  temperatureList.forEach((temp) => {
    const toConvert = Number(temp.textContent.slice(0,temp.textContent.length - 1));
    temp.textContent = fahrenheitToCelsius(toConvert) + "°";
  })

}

function toFahrenheit() {
  if (currentScale == "Fahrenheit") {
    return;
  }
  currentScale = "Fahrenheit";
  const temperatureList = document.querySelectorAll(".temperature-indicator");
  temperatureList.forEach((temp) => {
    const toConvert = Number(temp.textContent.slice(0,temp.textContent.length - 1));
    temp.textContent = celsiusToFahrenheit(toConvert) + "°";
  })
}

celsiusButton.addEventListener("click",() => {
  celsiusButton.style.cssText += "color: black; background-color: white;"
  fahrenheitButton.style.cssText += "color: white; background-color: #0b131e;"
  toCelsius();
})

fahrenheitButton.addEventListener("click",() => {
  fahrenheitButton.style.cssText += "color: black; background-color: white;"
  celsiusButton.style.cssText += "color: white; background-color: #0b131e;"
  toFahrenheit();
})

function getImageURL(conditionCode,day) {
    for (let i = 0; i < conditionArray.length;i++) {
        if (Number(conditionArray[i].code) == conditionCode) {
            if (day == 1) {
                console.log("It's day");
                console.log(conditionArray[i].urlDay);
                return conditionArray[i].urlDay;
            } else {
                console.log("It's night");
                console.log(conditionArray[i].urlNight);
                return conditionArray[i].urlNight;
            }
        }
    }
}

function createHourlyForecastCard(timeText,imagePath,temperature) {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const time = document.createElement("div");
    time.classList.add("hourly-time");
    time.textContent = timeText;

    const image = document.createElement("img");
    image.classList.add("hourly-forecast-image");
    image.setAttribute('src',imagePath);

    const temp = document.createElement("div");
    temp.classList.add("hourly-forecast-temperature","temperature-indicator");
    temp.textContent = temperature + "°";

    forecastCard.append(time,image,temp);

    return forecastCard;
}

function createDailyForecastCard(day,imagePath,condition,minTemperature,maxTemperature) {
  const container = document.createElement("div");
  container.classList.add("daily-forecast-card");

  const dayNode = document.createElement("div");
  dayNode.classList.add("day");
  dayNode.textContent = day;

  const image = document.createElement("img");
  image.classList.add("daily-forecast-image");
  image.setAttribute('src', imagePath);

  const conditionNode = document.createElement("div");
  conditionNode.classList.add("daily-condition");
  conditionNode.textContent = condition;

  const minMax = document.createElement("div");
  minMax.classList.add("min-max");

  const max = document.createElement("div");
  max.classList.add("max-temperature","temperature-indicator");
  max.textContent = maxTemperature + "°";

  const min = document.createElement("div");
  min.classList.add("min-temperature","temperature-indicator");
  min.textContent = minTemperature + "°";

  const seperator = document.createElement("div");
  seperator.classList.add("seperator");
  seperator.textContent = "/";

  minMax.append(max,seperator,min);

  container.append(dayNode,image,conditionNode,minMax);
  return container;

}

function getDailyForecast(forecastJSON,localTime) {
  const container = document.createElement("div");
  container.classList.add("daily-forecast-container");

  const forecastArray = forecastJSON.forecast.forecastday;
  for (let i = 0;i < 3;i++) {
    const dayNumber = new Date(forecastArray[i].date).getDay();
    let day;
    if (dayNumber == localTime.getDay()) {
      day = "Today";
    } else {
      day = weekDays[dayNumber];
    }
    const condition = forecastArray[i].day.condition.text;
    const imagePath = getImageURL(Number(forecastArray[i].day.condition.code),1);
    const minTemp = forecastArray[i].day.maxtemp_c;
    const maxTemp = forecastArray[i].day.mintemp_c;
    const card = createDailyForecastCard(day,imagePath,condition,minTemp,maxTemp);
    container.appendChild(card);
  }

  dailyForecast.replaceChild(container,dailyForecast.firstChild);

}

function getTimeString(hours) {
    const amPm = hours > 12 ? "PM":"AM";
    if (hours > 12) {
        hours -= 12;
    }
    else if (hours == 0) {
        hours = 12;
    }

    const returnString = `${hours}:00 ${amPm}`;
    return returnString;

}


async function getWeatherData(search){
    const weatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=fc9fa7e57bef4353adc51229240107&q=${search}`);
    const weatherJSON = await weatherData.json();
    const condition = weatherJSON.current.condition.text;
    const code = Number(weatherJSON.current.condition.code);
    const celsiusTemp = weatherJSON.current.temp_c;
    const uv = weatherJSON.current.uv;
    const windSpeed = weatherJSON.current.wind_kph;
    const feelsLike = weatherJSON.current.feelslike_c;
    const isDay = weatherJSON.current.is_day;
    const humidity = weatherJSON.current.humidity;
    const city = weatherJSON.location.name;
    const localtime = new Date(weatherJSON.location.localtime);
    const country = weatherJSON.location.country;
    return {condition,code,celsiusTemp,uv,windSpeed,feelsLike,isDay,humidity,city,localtime,country};
}

async function getForecastData(search,localTime) {
    const forecastData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fc9fa7e57bef4353adc51229240107&q=${search}&days=7`);
    const forecastJSON = await forecastData.json();
    console.log(forecastJSON);
    const container = getHourlyCards(forecastJSON,localTime);
    forecastCards.replaceChild(container,forecastCards.firstChild);
    getDailyForecast(forecastJSON,localTime);
}

function getHourlyCards(forecastJSON, localTime) {
  const container = document.createElement("div");
  container.classList.add("hourly-cards-container");

  const forecastArray = forecastJSON.forecast.forecastday;
  const leftDayHours = 23 - localTime.getHours() + 1;
  let leftHours = 23 - leftDayHours + 1;
  for (let i = 0; i < leftDayHours; i++) {
    const time = new Date(forecastArray[0].hour[localTime.getHours() + i].time);
    console.log(time.getHours());

    const conditionText = forecastArray[0].hour[localTime.getHours() + i].condition.text;
    const conditionCode = Number(forecastArray[0].hour[localTime.getHours() + i].condition.code);
    const isDay = forecastArray[0].hour[localTime.getHours() + i].is_day;
    const imageURL = getImageURL(conditionCode, isDay);
    const temperature = forecastArray[0].hour[localTime.getHours() + i].temp_c;

    const hourCard = createHourlyForecastCard(getTimeString(time.getHours()), imageURL, temperature);

    container.appendChild(hourCard);

    console.log(conditionText);
  }
  for (let i = 0; i < leftHours; i++) {
    const time = new Date(forecastArray[1].hour[i].time);
    console.log(time.getHours());

    const conditionText = forecastArray[1].hour[i].condition.text;
    const conditionCode = Number(forecastArray[1].hour[i].condition.code);
    const isDay = forecastArray[1].hour[i].is_day;
    const imageURL = getImageURL(conditionCode, isDay);
    const temperature = forecastArray[1].hour[i].temp_c;

    const hourCard = createHourlyForecastCard(getTimeString(time.getHours()), imageURL, temperature);

    container.appendChild(hourCard);

    console.log(conditionText);
  }

  return container;
}

const updateMainInfo = (weatherObject) => {
    const location = document.querySelector(".location");
    const temp = document.querySelector(".temperature");
    const icon = document.querySelector(".weather-icon");
    const description = document.querySelector(".description");
    description.textContent = weatherObject.condition;
    location.textContent = weatherObject.city;
    temp.textContent = weatherObject.celsiusTemp + "°";
    icon.setAttribute('src',getImageURL(weatherObject.code,weatherObject.isDay));
}

const updateConditions = (weatherObject) => {
  const realFeel = document.querySelector("#real-feel");
  const wind = document.querySelector("#wind");
  const uv = document.querySelector("#uv");
  const humidity = document.querySelector("#humidity");

  realFeel.textContent = weatherObject.feelsLike + "°";
  wind.textContent = `${weatherObject.windSpeed} Km/h`;
  uv.textContent = weatherObject.uv;
  humidity.textContent = `${weatherObject.humidity}%`;
}

async function fetchData(city) {
  try {
    const weatherObject = await getWeatherData(city);
    await getForecastData(city, weatherObject.localtime);
    return weatherObject;
  } catch(error) {
    alert(error);
  }
}

function setUpPage(weatherObject) {
  console.log(weatherObject);
  updateMainInfo(weatherObject);
  updateConditions(weatherObject);
}

button.addEventListener("click",async ()=> {
  try {
    if (input.value.length == 0) {
      alert("Please enter a city");
      return;
    }
    loadingMain.style.cssText += "display: block;"
    const weatherObject = await fetchData(input.value);
    setUpPage(weatherObject);
    
  } catch(error) {
    console.log(error);
  } finally {
    loadingMain.style.cssText += "display: none;"
  }
  
})
