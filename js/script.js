let weatherForm = document.querySelector("#weatherForm");

let historyData = document.querySelector("#historycity");
let weatherContentInner = document.querySelector(".weather-right-city")
let weatherFivedays = document.querySelector(".weather-content-inner");
let cityListItems = document.querySelector(".history-city ul")

weatherForm.addEventListener("submit",async (e) => {
    e.preventDefault();
    let oldCityData = e.target.weatherCityName.value;
    displayDataByInput(oldCityData)
//    await displayWeatherCity(oldCityData) 
    let oldLocalData = JSON.parse(localStorage.getItem("weather")) ?? [];

   
    //same two cities cannt enter
    if (!oldLocalData.includes(oldCityData)) {
        let newLocalData = [...oldLocalData, oldCityData];


       


        let finalDataLocal = localStorage.setItem("weather", JSON.stringify(newLocalData))
    //   await displayCity()
  
     
    }

    else {
        alert("City Name already exists!!")
    }

    e.target.weatherCityName.value = ""
      

})


//Search city Name in publish here
function displayCity() {
    let getDataLocal = JSON.parse(localStorage.getItem("weather")) ?? []
    getDataLocal.forEach((value, index) => {
        cityListItems.innerHTML += `<li onclick="activeItem(${index}) ; displayWeatherCity(${index})">${value}</li>`

    });

}
displayCity()


//active List items means history city
function activeItem(index) {
    let activeItem = document.querySelectorAll(".history-city ul li")
    activeItem.forEach((v, i) => {
        if (index != i) {
            v.classList.remove("activeListItems")
            activeItem[i].classList.remove("activeListItems")
        }

        activeItem[index].classList.add("activeListItems")
    })

}




//display weather accoding to input city;
async function displayWeatherCity(index) {

    const apiKey = `4d8fb5b93d4af21d66a2948710284366`;
    let iconPath = `http://openweathermap.org/img/w/`
    
    let getLocalStorageData=JSON.parse(localStorage.getItem("weather"))  ?? []

    for(var s in getLocalStorageData){
        
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${getLocalStorageData[s]}&appid=${apiKey}&units=metric`;
    let fetchData = await fetch(url);
    let finalData = await fetchData.json();

    let { main, sys, weather, wind, name } = finalData
   
    //today's Date
    let currentDay = new Date();
    let currentDate = currentDay.getDate();
    let currentMonth = currentDay.getMonth() + 1;
    let currentyear = currentDay.getFullYear();
    let todaySData = `${currentDate}/${currentMonth}/${currentyear}`
    if (index==s) {
        weatherContentInner.innerHTML = ` <div class="weather-city-show">
                <h3>${name}  ${todaySData}</h3><img src="" />
                <div class="temp">
                    <h4>Temp:<span>${main.temp}<sup>o</sup>F</span></h4>
                </div>
                <div class="wind">
                    <h4>Wind:<span>${wind.speed}MPH</span></h4>
                </div>
                <div class="humidity">
                    <h4>Humidity:<span>${main.humidity}%</span></h4>
                </div>
                </div>`
    }
   }
}

// displayWeatherCity()


async function displayDataByInput(cityName){
    const apiKey = `4d8fb5b93d4af21d66a2948710284366`;
    let iconPath = `http://openweathermap.org/img/w/`

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    let fetchData = await fetch(url);
    let finalData = await fetchData.json();

    let { main, sys, weather, wind, name } = finalData
   
    //today's Date
    let currentDay = new Date();
    let currentDate = currentDay.getDate();
    let currentMonth = currentDay.getMonth() + 1;
    let currentyear = currentDay.getFullYear();
    let todaySData = `${currentDate}/${currentMonth}/${currentyear}`
   
        weatherContentInner.innerHTML = ` <div class="weather-city-show">
                <h3>${name}  ${todaySData}</h3><img src="" />
                <div class="temp">
                    <h4>Temp:<span>${main.temp}<sup>o</sup>F</span></h4>
                </div>
                <div class="wind">
                    <h4>Wind:<span>${wind.speed}MPH</span></h4>
                </div>
                <div class="humidity">
                    <h4>Humidity:<span>${main.humidity}%</span></h4>
                </div>
                </div>`
    }