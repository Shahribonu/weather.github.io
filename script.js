const apiKey = 'ebff6d3a14c1a9804f7037df45cc0b7c';

function handleKeyUp(event) {
    if (event.key === 'Enter') {
        const city = document.getElementById('city').value;
        if (city) {
            getWeather(city);
        } 
    }
}

document.getElementById('geolocation').addEventListener('click',getCurrentLocationWeather)


function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            console.log(data.name, data.sys.country, data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function getCurrentLocationWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeatherByCoordinates(latitude, longitude);
        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                    break;
                default:
                    console.log("An unknown error occurred.");
            }
        });
    } else {
        console.log("Geolocation is not available in this browser.");
    }
}

function getWeatherByCoordinates(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}



function displayWeather(data) {
    const location = data.name;
    const humidity = data.main.humidity
    const feelsLike = data.main.feels_like
    const pressure = data.main.pressure
    const sunrise = data.sys.sunrise
    const visibility = data.visibility
    const wind = data.wind.deg
    const speed = data.wind.speed
    const sunset = data.sys.sunset
    const temperature = (data.main.temp - 273.15).toFixed(1) + '°c';
    const description = data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById('location').innerHTML = ` ${location}`;
    document.getElementById('temperature').textContent = ` ${temperature}`;
    document.getElementById('description').textContent = ` ${description}`;
    document.getElementById('icon').src = icon;
    document.getElementById('time').textContent = new Date().toLocaleDateString();
    document.getElementById('humidity').textContent = ` ${humidity}`;
    document.getElementById('pressure').textContent = ` ${pressure}`;
    document.getElementById('feelsLike').textContent = ` ${feelsLike}`;
    document.getElementById('sunrise').textContent = ` ${sunrise}`;
    document.getElementById('sunset').textContent = ` ${sunset}`;
    document.getElementById('visibility').textContent = ` ${visibility}`;
    document.getElementById('wind').textContent = ` ${wind}`;
    document.getElementById('speed').textContent = ` ${speed}`;

}
