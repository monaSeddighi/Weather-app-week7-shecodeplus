function formatDate(timestamp){
let date= new Date(timestamp);
let hours=date.getHours();
if (hours<10){
hours=`0${hours}`
}
let minutes=date.getMinutes();
if (minutes<10){
    minutes=`0${minutes}`
}
let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day=days[date.getDay()];
return `${day} ${hours}:${minutes}`
}

function displayForecast(){
let forecastElement=document.querySelector("#forecast")
let forecastHTML=`<div class="row">`;
let days=["Thu", "Fri", "Sat", "Sun"];
days.forEach(function(day){
forecastHTML=forecastHTML+`
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18°</span>
                  <span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>`})
            forecastHTML=forecastHTML+`</div>`;
            forecastElement.innerHTML=forecastHTML;
                }

      function getForecast(coordinates){
        let apiKey="5b74d10f3ef03caf1ac640b557c288c3";
        let apiUrl=`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl)
}          
function displayTemperature(response){     
let temperatureElement=document.querySelector("#temperature")
let humidityElement=document.querySelector("#humidity")
let windElement=document.querySelector("#wind")
let dateElement=document.querySelector("#date")
let cityElement=document.querySelector("#city");
let weatherdescriptioElement=document.querySelector("#description");
let iconElement=document.querySelector("#icon");

celsiusTemperature=response.data.main.temp;

temperatureElement.innerHTML=Math.round(response.data.main.temp);
humidityElement.innerHTML=Math.round(response.data.main.humidity);
windElement.innerHTML=Math.round(response.data.wind.speed);
dateElement.innerHTML=formatDate(response.data.dt * 1000);
cityElement.innerHTML=response.data.name;
weatherdescriptioElement.innerHTML=response.data.weather[0].description;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);

getForecast(response.data.coord)
 }
function search(city){
    let apiKey="5b74d10f3ef03caf1ac640b557c288c3";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature)

}
function handleSubmit(event){
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}



function displayFahrenheitTemperature(event){
event.preventDefault();
let temperatureElement=document.querySelector("#temperature");
//remove the active class of the celsius link
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active")
let fahrenheitTemperature=(celsiusTemperature* 9/5) + 32;
temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active")
let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML=Math.round(celsiusTemperature);
}


let celsiusTemperature=null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit); 


let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
displayForecast()