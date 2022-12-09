function formatDate(timestamp){
let date= new Date(timestamp);
let hours=date.getHours();
let minutes=date.getMinutes();
let day=date.getDay();
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
dateElement.innerHTML=formatDate(response.date.dt * 1000);
let cityElement=document.querySelector("#city");
cityElement.innerHTML=response.data.name;
let weatherdescriptioElement=document.querySelector("#description");
weatherdescriptioElement.innerHTML=response.data.weather[0].description;
}
let apiKey="5b74d10f3ef03caf1ac640b557c288c3";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature)