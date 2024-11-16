function getweather(url) {
   fetch(url).then((res) => res.json()).then((data) => {
     console.log(data);
     if (data.cod === 200) {
      let location = document.querySelector("#location");
      let temperature = document.querySelector("#temperature");
      let description = document.querySelector("#description");
      let weather_icon = document.querySelector("img");

      const cityname = data.name;
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      location.textContent = cityname;
      temperature.textContent = `${temp}°C`;
      description.textContent = desc;
      weather_icon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
     } else {
       alert("City Not Found")
      }
    })
}


const api_key = "c188ae51ec26b787177c1072d49357a0";

document.addEventListener("DOMContentLoaded", function () {
  window.navigator.geolocation.getCurrentPosition((data) => {
    const lat = data.coords.latitude;
    const lon = data.coords.longitude;
    
    console.log(lat)
    console.log(lon);
    let url =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
   getweather(url);
  });
})

let searchbtn = document.querySelector("#search-button");
searchbtn.addEventListener("click", function () {
  let input = document.querySelector("input");
  const city_input = input.value.trim();
  if (!city_input) {
    alert("Please Enter City Name");
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_input}&appid=${api_key}&units=metric`;
    getweather(url);
  }
});