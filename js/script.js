let weatherForm = document.querySelector("#weatherForm");

let historyData = document.querySelector("#historycity");
let weatherContentInner = document.querySelector(".weather-right-city")
let weatherFivedays = document.querySelector(".weather-content-inner");
let cityListItems = document.querySelector(".history-city ul")

let finalDataLocal;
//form Submission and data save in localStoage
weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let inputValueByUser = e.target.weatherCityName.value;
  
    //for currrent weather
     displayDataByInput(inputValueByUser)
     //forcast weather
     displayforcastdataByCityName(inputValueByUser)
   
    // await displayWeatherCity(inputValueByUser)
    //get data from local storage
    let oldLocalData = JSON.parse(localStorage.getItem("weather")) ?? [];

    //if user didnt put any city name, input box is empty
    if (inputValueByUser != "") {
        //same two cities cannt enter
        if (!oldLocalData.includes(inputValueByUser)) {
            let newLocalData = [...oldLocalData, inputValueByUser];

              //set data into local storage
            finalDataLocal = localStorage.setItem("weather", JSON.stringify(newLocalData))
            


        }

        else {
            $.toast({
                text:"City Name already exists!!",
                icon: 'info',
                  position : 'top-left' ,
                hideAfter : 2000, 
                showHideTransition : 'slide'
              })
        }
    } else {
        $.toast({
            text:"please type any City name!!",
            icon: 'info',
              position : 'top-left' ,
            hideAfter : 2000, 
            showHideTransition : 'slide'
          })
    }
    displayCity();
    e.target.weatherCityName.value = ""


})


//History Searched city Name in  here
function displayCity() {
    cityListItems.innerHTML='';
    let getDataLocal = JSON.parse(localStorage.getItem("weather")) ?? []
    getDataLocal.forEach((value, index) => {
        cityListItems.innerHTML += `<li>  <span  onclick="activeItem(${index}) ; displayDataByInput('${value}'), displayforcastdataByCityName('${value}')">${value}</span><span onclick="deleteItemsList(${index})"><i class="fa-solid fa-delete-left"></i></span></li>`
    });

}
displayCity()





//current display weather from input when we search input box
async function displayDataByInput(cityName) {
   
    const apiKey = `4d8fb5b93d4af21d66a2948710284366`;
    let iconPath = `http://openweathermap.org/img/w/`

    //current weather
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
                <h3>${name}  ${todaySData}</h3><img src="${iconPath+weather[0].icon}.png" />
                <div class="temp">
                    <h4>Temp:<span>${main.temp}<sup>o</sup>C</span></h4>
                </div>
                <div class="wind">
                    <h4>Wind:<span>${wind.speed}MPH</span></h4>
                </div>
                <div class="humidity">
                    <h4>Humidity:<span>${main.humidity}%</span></h4>
                </div>
                </div>`

}


    //five days weather according to user input

    let timeZone;
    let dayTime;

     async function displayforcastdataByCityName(cityName){
    let iconPath = `http://openweathermap.org/img/w/`

    const urlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lat={lat}&lon={lon}&appid=72b27c2c885152dc7727a5905cfe710c`
    let fetchDataFiveDays = await fetch(urlFiveDays);
    let finalDataFiveDays = await fetchDataFiveDays.json();
    let filterData = finalDataFiveDays.list;

    weatherFivedays.innerHTML = ""
    filterData.forEach((v, i) => {

        //time in API
        var timeData = v.dt_txt
       
            //want to get last time which is "00:00:00"
            timeZone = timeData.split(" ")[1]
            dayTime = timeData.split(" ")[0]
       

        //just need data for daily , not for hourly data
        if (timeZone == "00:00:00") {

          weatherFivedays.innerHTML += ` <div class="weather-city-show">
                <h3>${cityName}  ${dayTime}</h3><img src="${iconPath + v.weather[0].icon}.png" />
                <div class="temp">
                    <h4>Temp:<span>${(v.main.temp - 273.15).toFixed(2)}<sup>o</sup>C</span></h4>
                </div>
                <div class="wind">
                    <h4>Wind:<span>${v.wind.speed}MPH</span></h4>
                </div>
                <div class="humidity">
                    <h4>Humidity:<span>${v.main.humidity}%</span></h4>
                </div>
                </div>`
        }
    })

}


    


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


//active item hover  form local storage if have , then remove by input value
let userrInput=document.querySelector("#userrInput");
let activeItemList = document.querySelectorAll(".history-city ul li ")
userrInput.addEventListener("keyup",()=>{
    activeItemList.forEach((v,i)=>{
        activeItemList[i].classList.remove("activeListItems")
    })
})


//delete item for history items

let activeItemListDelete = document.querySelectorAll(".history-city ul li")
function deleteItemsList(indexWeather){


        let localGetDataNew = JSON.parse(localStorage.getItem("weather")) ?? []
        localGetDataNew.splice(indexWeather,1)
        finalDataLocal = localStorage.setItem("weather", JSON.stringify(localGetDataNew))
        weatherContentInner.innerHTML=""
        weatherFivedays.innerHTML = "";
      displayCity();
    }
  

