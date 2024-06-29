
document.querySelector("#cityBtn").addEventListener("click", checkWeatherForCity);

async function checkWeatherForCity() {
    let cityName = document.getElementById("cityName").value;
    await getWeatherMap(cityName);
}
async function getWeatherMap(city) {
    let weatherMap = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6fa9a93a95c4729b9f17465daf4d319d&units=metric`);
    let weatherMapData = await weatherMap.json();
    console.log(weatherMapData);
    getTemperature(weatherMapData);
    getNow(weatherMapData);
    getWind(weatherMapData);
    getHumidity(weatherMapData);
    getSunRiseAndSet(weatherMapData);
    getSeaLevel(weatherMapData);
}

function getTemperature(data) {
    if (!data) {
        console.error("data is null");
        return;
    }
    let temperature = data.main.temp;
    let temp = document.querySelector("#temp");
    temp.innerHTML = temperature + "\u2103";
    let minTemp = document.querySelector("#minTemp");
    minTemp.innerHTML = "<h6>min</h6>";
    minTemp.innerHTML += data.main.temp_min + "\u2103";
    let maxTemp = document.querySelector("#maxTemp");
    maxTemp.innerHTML = "<h6>max</h6>";
    maxTemp.innerHTML += data.main.temp_max + "\u2103";
    let feelsLikeTemp = document.querySelector("#feelsLikeTemp");
    feelsLikeTemp.innerHTML = "<h6>feels like</h6>"
    feelsLikeTemp.innerHTML += data.main.feels_like + "\u2103";
    let img = document.querySelector(".celsiusImg");
    let imgCode = data.weather[0].icon;
    img.src = `https://openweathermap.org/img/wn/${imgCode}.png`;
}

function getNow(data) {
    if (!data) {
        console.error("data is null");
        return;
    }
    let timestamp = data.dt * 1000;
    let timezoneOffset = data.timezone * 1000;
    let dateObj = new Date(timestamp + timezoneOffset - 3 * 1000 * 60 * 60);
    let time = document.querySelector("#time");
    time.innerHTML = dateObj.getHours() + ":" + dateObj.getMinutes();
    let date = document.querySelector("#date");
    date.innerHTML = dateObj.toDateString();
    let img = document.querySelector(".nowImg");
    let imgCode = data.weather[0].icon;
    img.src = `https://openweathermap.org/img/wn/${imgCode}.png`;
}
async function getForecast(city) {
    let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appis=6fa9a93a95c4729b9f17465daf4d319d&units=metric`);
    let forecastParsed = await forecast.json();
    console.log(forecastParsed);
}
function getWind(data) {
    let windSpeed = document.querySelector("#windSpeed");
    windSpeed.innerHTML = "<h6>speed<h6>";
    windSpeed.innerHTML += data.wind.speed;
    let windDegree = document.querySelector("#windDegree");

    //fillCircle(windDegree, data.wind.deg);
    windDegree.innerHTML = "<h6>degree<h6>";
    windDegree.innerHTML += data.wind.deg;
    // windDegree.borderImage = `linear-gradient(red,blue)27`;
}
function fillCircle(elem, percent) {
    const ctx = elem.getContext('2d');
    ctx.clearRect(0, 0, elem.width, elem.height);
    const centerX = elem.width / 2;
    const centerY = elem.height / 2;
    const radius = 80;
    ctx.fillStyle = "#010122";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * percent / 100));
    ctx.closePath();
    ctx.fill();
}
function getHumidity(data) {
    let humidityRate = document.querySelector("#humidityRate");
    let humidNum = document.querySelector(".humidNum");
    let humidImg = document.querySelector(".humidImg");
    if (humidNum) {
        humidityRate.removeChild(humidNum);
    }
    if (humidImg) {
        humidityRate.removeChild(humidImg);
    }

    const num = document.createElement("span");
    num.textContent = data.main.humidity;
    num.className = "humidNum";
    let img = document.createElement("img");
    img.src = "./images/humidity.svg";
    img.alt = "humidity";
    img.className = "humidImg";
    humidityRate.appendChild(num);
    humidityRate.appendChild(img);
}

function getSunRiseAndSet(data) {
    let sunrise = document.getElementById("sunrise");
    sunrise.innerHTML = "<h6>sun rise</h6>";
    let date = new Date(data.sys.sunrise * 1000);
    sunrise.innerHTML += date.getHours() + ":" + date.getMinutes();
    let sunset = document.getElementById("sunset");
    sunset.innerHTML = "<h6>sun set</h6>";
    date = new Date(data.sys.sunset * 1000);
    sunset.innerHTML += date.getHours() + ":" + date.getMinutes();

}

function getSeaLevel(data) {
    let seaLvlInfo = document.getElementById("seaLvlInfo");
    seaLvlInfo.innerHTML = data.main.sea_level;
}