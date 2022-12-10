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


function displayTemperature(response){     
let temperatureElement=document.querySelector("#temperature")
temperatureElement.innerHTML=Math.round(response.data.main.temp);
let humidityElement=document.querySelector("#humidity")
humidityElement.innerHTML=Math.round(response.data.main.humidity);
let windElement=document.querySelector("#wind")
windElement.innerHTML=Math.round(response.data.wind.speed);
let dateElement=document.querySelector("#date")
dateElement.innerHTML=formatDate(response.data.dt * 1000);
let cityElement=document.querySelector("#city");
cityElement.innerHTML=response.data.name;
let weatherdescriptioElement=document.querySelector("#description");
weatherdescriptioElement.innerHTML=response.data.weather[0].description;
let iconElement=document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);
}
let apiKey="5b74d10f3ef03caf1ac640b557c288c3";
let city="New York";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature)