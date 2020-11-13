//Select elements from the DOM
let temperature_description = document.querySelector('.temperature-description');
let temperature_degree = document.querySelector('.temperature-degree');
let temperature_timezone = document.querySelector('.location-timezone');
let temperature_icon = document.querySelector('.location-icon');
let temperatureSpan = document.querySelector('.temperature-degree').nextElementSibling;
window.addEventListener('load', () => {
let long;
let lat;
let icon;
if(navigator.geolocation) {
navigator.geolocation.getCurrentPosition( function(position) {
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=114ad49b1a1aa7290bbd9ee502d90d09`;

    //Fetch data from the api using the fetch api
    fetch(api)
    .then(res => res.json())
    .then(weather => {
    let tempDesc = displayWeather(weather.weather[0].description, 
    weather.main.temp, `${weather.name}, ${weather.sys.country}`);


    //Check the weather and set the icon
    switch(tempDesc) {
        case "overcast clouds":
        icon = "PARTLY_CLOUDY_DAY";
        break;

        default:
        icon = "CLEAR_DAY";
        break;
    }
    //Set icon
    setIcons(icon, document.querySelector('.icon'));
   
    document.querySelector('.temperature').addEventListener('click', () => {
        let K = weather.main.temp;
        console.log(weather);
        if(temperatureSpan.textContent === "K") {
            let F = Math.round(parseInt(temperature_degree.textContent) - 273.15)*9/5 +32;
             temperatureSpan.previousElementSibling.textContent = F;
             temperatureSpan.textContent = 'F';
        } else if(temperatureSpan.textContent === 'F') {
           let C = Math.round((parseInt(temperature_degree.textContent) - 32) * 5/9);
           temperatureSpan.textContent = 'C';
           temperature_degree.textContent = C;
        } else {
            temperatureSpan.textContent = 'K';
            temperature_degree.textContent = weather.main.temp;
        }
        })
    });
});

} 
function setIcons(icon, iconID) {
    const skyCons = new Skycons({color: "white"});
    skyCons.play();
    return skyCons.set(iconID, Skycons[icon]);
}
});
function displayWeather(desc, degree, timezone) {
    const tempDesc = desc;
    const tempDegree = degree;
    const tempTimezone = timezone;

    //Set data in the ui
    temperature_description.textContent = tempDesc;
    temperature_degree.textContent = tempDegree;
    temperature_timezone.textContent = tempTimezone;

    return tempDesc;
}

//Dislay year in the footer
document.querySelector('.date').textContent = new Date().getFullYear();