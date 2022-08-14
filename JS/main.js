const api = {
    key: '74a0eebf7050c5f3f37a72551c4fc920',
    baseurl:"https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress',setQuery);


function setQuery(e){
    if(e.keyCode == 13){
         getResults(searchBox.value);
        
        console.log(searchBox.value);
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) =>{
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name} ${weather.sys.country} `
    
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;


    let weatherEl =document.querySelector('.weather')
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector("hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp.min)} °C / ${Math.round(weather.main.temp.max)}°C`;
}
function dateBuilder(s){
    let months = ['January', 'february', 'march', 'April', 'May', 'June', 'July', 'Augst','September', 'Oktober', 'November','December']
    let days = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday','Friday','Saturday'];
    let day = days[s.getDay()]
    let date = s.getDate()
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `4{Day}, ${day}, ${month}, ${year}`
}
