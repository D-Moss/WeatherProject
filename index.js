function search(event) {
	event.preventDefault();
	let searchInputElement = document.querySelector("#search-input");
	let city = searchInputElement.value;
	let apiKey = "2407d7ad9e375fc518c7de5dc454c92a";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

	axios
	.get(apiUrl)
	.then(showWeather)
	.catch(function (error) {
		console.error("There was an error fetching the weather data:", error);
	});
}

function formatDate(timestamp) {
	let date = new Date(timestamp);
	let minutes = date.getMinutes();
	let hours = date.getHours();
	let day = date.getDay();
	let dateOfMonth = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();

	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	if (hours < 10) {
		hours = `0${hours}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	let formattedDay = days[day];
	let formattedMonth = months[month];
	return `${formattedDay}, ${formattedMonth} ${dateOfMonth}, ${year} ${hours}:${minutes}`;
}

function showWeather(response) {
	let cityElement = document.querySelector("#current-city");
	let dateElement = document.querySelector("#current-date");
	let temperatureElement = document.querySelector("#temperature");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let weatherIconElement = document.querySelector("#weather-icon");
	let descriptionElement = document.querySelector("#description");

	let temperature = Math.round(response.data.main.temp);
	let city = response.data.name;
	let description = response.data.weather[0].description;
	let humidity = response.data.main.humidity;
	let wind = Math.round(response.data.wind.speed * 3.6);
	let weatherIcon = getWeatherEmoji(response.data.weather[0].main);

	let timestamp = response.data.dt * 1000;
	dateElement.innerHTML = formatDate(timestamp);

	cityElement.innerHTML = city;
	temperatureElement.innerHTML = temperature;
	humidityElement.innerHTML = `${humidity}%`;
	windElement.innerHTML = `${wind} km/h`;
	weatherIconElement.innerHTML = weatherIcon;
	descriptionElement.innerHTML = description;
}

function getWeatherEmoji(weatherMain) {
	const weatherEmojiMap = {
		Clear: "☀️",
    	Clouds: "☁️",
	    Rain: "🌧️",
	    Drizzle: "🌦️",
	    Thunderstorm: "⛈️",
	    Snow: "❄️",
	    Mist: "🌫️",
	    Smoke: "🌫️",
	    Haze: "🌫️",
	    Dust: "🌫️",
	    Fog: "🌫️",
	    Sand: "🌫️",
	    Ash: "🌋",
	    Squall: "🌬️",
	    Tornado: "🌪️",
	};
	return weatherEmojiMap[weatherMain] || "";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);