let inputField = document.querySelector('input');
let locBtn = document.getElementById('locBtn');
let bigIcon = document.querySelector('.big-icon img');
let mainTemp = document.getElementById('mainTemp');
let dayTime = document.getElementById('dayTime');
let iconLeftComment1 = document.getElementById('iconLeftComment1');
let leftComment1 = document.getElementById('leftComment1');
let iconLeftComment2 = document.getElementById('iconLeftComment2');
let leftComment2 = document.getElementById('leftComment2');
let cityImage = document.querySelector('.inside-left .city img');
let days = document.querySelectorAll('.day');
let windSpeed = document.getElementById('windSpeed');
let sunrise = document.getElementById('sunrise');
let sunriseTimeDiffer = sunrise.nextElementSibling;
let sunset = document.getElementById('sunset');
let sunsetTimeDiffer = sunset.nextElementSibling;
let directionImage = document.getElementById('directionImage');
let directionComment = directionImage.parentNode.nextElementSibling.firstChild;
let humidity = document.getElementById('humidity');
let humidityLevel = document.getElementById('humidityLevel');
let humidityComment = document.getElementById('humidityComment');
let visibility = document.getElementById('visibility');
let visibilityComment = document.getElementById('visibilityComment');
let pressure = document.getElementById('pressure');
let pressureComment = document.getElementById('pressureComment');
let pressureLevel = document.getElementById('pressureLevel');
let uvLevel = document.getElementById('b');
let uvIndex = document.querySelector('small');

let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let weeklyIconSrc = "";
const d = new Date();
function prepareDay(miliSec) {
    let dayIndex = d.getDay(miliSec);
    return dayArr[dayIndex];
}
// function for select icon according to data from API
function iconSelector(icon){
    switch (icon) {
        case "clear-day":
            return "sun.ico";
        case "partly-cloudy-day":
            return "image-6.png";
        case "rain":
            return "image-4.png";
        case "cloudy":
            return "image-3.png";
        case "snow":
            return "image-5.png";
        default:
            return "sun.ico";
    }
}
//function for weekly data show and sortout next 7 day from today
function showWeeklyData(startDay, infoDays ) {
    let newDayArr = [];
        for (let i = 0; i < 7; i++) {
            let indx = i + startDay;

            if (indx < dayArr.length) {
                newDayArr.push(dayArr[indx])
            }
            else {
                let rem = 7 - i;
                for (let j = 0; j < rem; j++) {
                    newDayArr.push(dayArr[j]);
                }
                break;
            }
        }
        // loop for weekly day update
        for (let i = 0; i < 7; i++) {
            weeklyIconSrc = iconSelector(infoDays[i].icon);
            days[i].innerHTML = `<div>
            <h5 id="day1">${newDayArr[i]}</h5>
            </div>
            <div>
            <img src="./images/${weeklyIconSrc}" alt="">
            </div>
            <div>
            <p> <span class="every-day-high">${infoDays[i].tempmax}°</span> <span class="every-day-low">${infoDays[i].tempmin}°</span></p>
            </div>`;

        }
}
function showUvLevel(value){
    let x = 135 + (value*(180/15));
    uvLevel.style.transform = `rotate(${x}deg)`;
}

function commentHumidity(value){
    
    if(value < 30){
        humidityComment.innerHTML = `Too Dry &#128078`;
    }
    else if(value >= 30 && value <=50){
        humidityComment.innerHTML = `Optimum &#128077`;
    }
    else{
        humidityComment.innerHTML = `Wet &#128078`;
    }
}

function commentPressure(value){
    value += 990;
    if(value < 1000){
        console.log(value)
        pressureComment.innerHTML = `Low &#128078`;
    }
    else if(value > 1020){
        console.log(value)
        pressureComment.innerHTML = `High &#128078`;
    }
    else{
        console.log(value)
        pressureComment.innerHTML= `Optimum &#128077`;
    }
}
function commentVisibility(value){
    if(value > 0.2 && value <= 0.5){
        visibilityComment.innerHTML = 'Moderate Fog &#128577';
    }
    else if(value > 0.5 && value <= 1){
        visibilityComment.innerHTML = 'Light Fog &#128577';
    }
    else if(value > 1 && value <= 2){
        visibilityComment.innerHTML = 'Thin Fog &#128577';
    }
    else if(value > 2 && value <= 4){
        visibilityComment.innerHTML = ' Haze &#128577';
    }
    else if(value > 4 && value <= 10){
        visibilityComment.innerHTML = 'Light Haze &#128577';
    }
    else if(value > 10 && value <= 200){
        visibilityComment.innerHTML = 'Clear &#128577';
    }
    else if(value > 20 && value <= 50){
        visibilityComment.innerHTML = 'Very Clear &#128577';
    }
    else if(value > 50){
        visibilityComment.innerHTML = 'Exceptionally Clear &#128577';
    }
    else{
        visibilityComment.innerHTML = 'Pure Air &#128577';
    }
}
function showLevelAsPiller(value, callback){
    //if block for pressure else block for uv level.
    let x;
    if(value > 100){
        //show pressue at the scale size 40. (990 to 1030)
        value -= 990;
        x = (40/40.0)*value;
        pressureLevel.style.bottom = `${x}px`;
        pressureLevel.style.border = `9px solid rgb(${64+(value*1.71)}, ${80-(value*0.8)}, ${210-(value*2.21)})`;
    }
    else{
       x = (67/100.0)*value; 
       humidityLevel.style.bottom = `${x}px`;
       humidityLevel.style.border = `9px solid rgb(${64+(value*1.71)}, ${80-(value*0.8)}, ${210-(value*2.21)})`;
    }
    
    callback(value);
}
function airDirector(deg){
    switch (true) {
        case (deg==0 || deg==360):{
            directionImage.src = './images/north.png';
            directionComment.innerText = 'N';
            break;
        }
            
        case deg == 45:{
            directionImage.src = './images/east-north.png';
            directionComment.innerText = 'NE';
            break;
        }
            
        case deg == 90:{
            directionImage.src = './images/east.png';
            directionComment.innerText = 'E';
            break;
        }
            
        case deg == 135:{
            directionImage.src = './images/east-south.png';
            directionComment.innerText = 'SE';
            break;
        }
            
        case deg == 180:{
            directionImage.src = './images/south.png';
            directionComment.innerText = 'S';
            break;
        }
            
        case deg == 225:{
            directionImage.src = './images/west-south.png';
            directionComment.innerText = 'SW';
            break;
        }
            
        case deg == 270:{
            directionImage.src = './images/west.png';
            directionComment.innerText = 'W';
            break;
        }
            
        case deg == 315:{
            directionImage.src = './images/west-north.png';
            directionComment.innerText = 'NW';
            break;
        }
            
        case (deg>0 && deg<45):{
            directionImage.src = './images/north.png';
            directionComment.innerText = 'NNE';
            break;
        }
            
        case (deg>45 && deg<90):{
            directionImage.src = './images/est.png';
            directionComment.innerText = 'ENE';
            break;
        }
            
        case (deg>90 && deg<135):{
          directionImage.src = './images/est.png';
            directionComment.innerText = 'ESE';
            break;  
        }
            
        case (deg>135 && deg<180):{
            directionImage.src = './images/south.png';
            directionComment.innerText = 'SSE';
            break;
        }
            
        case (deg>180 && deg<225):{
            directionImage.src = './images/south.png';
            directionComment.innerText = 'SSW';
            break;
        }
            
        case (deg>225 && deg<270):{
            directionImage.src = './images/west.png';
            directionComment.innerText = 'WSW';
            break;
        }
            
        case (deg>270 && deg<315):{
            directionImage.src = './images/west.png';
            directionComment.innerText = 'WNW';
            break;
        }
            
        case (deg>315 && deg<360):{
            directionImage.src = './images/north.png';
            directionComment.innerText = 'NNW';
            break;
        }
            
        default:
            break;
    }
}
function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    time[3] = ' ';
    return time.join (''); // return adjusted time or original string
}
//function for differentiate today and tomorrow sunrise and sunset time
function diffTime(time1,time2) {
    let hour1 = time1.split(':')[0];
    let hour2 = time2.split(':')[0];
    let min1 = time1.split(':')[1];
    let min2 = time2.split(':')[1];
    let sec1 = time1.split(':')[2];
    let sec2 = time2.split(':')[2];
  
    let diff_hour = hour2 - hour1;
    let diff_min = min2 - min1;
    let diff_sec = sec2 - sec1;
    if (diff_hour<0) {
        diff_hour+= 24;
    }
    if (diff_min<0) {
        diff_min+=60;
    } else if(diff_min>=60){
        diff_min-=60;
        diff_hour++;
    }
    if (diff_sec<0) {
        diff_sec+=60;
        diff_min--;
    } else if(diff_sec>=60){
        diff_min-=60;
        diff_min++;
    }
    return([diff_hour, diff_min,diff_sec]) ;
  
  }

  
  
let api;

inputField.addEventListener("keyup", e => {
    // if user pressed enter btn and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locBtn.addEventListener("click", () => {
    if (navigator.geolocation) { // if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});
//normal API url preparing according to input field data
function requestApi(city) {
    api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=4MGQZETDBJB3PQFJ833EUNJJC&contentType=json`;
    fetchData();
}
//geo location success state API url pretaring
function onSuccess(position) {
    const { latitude, longitude } = position.coords; // getting lat and lon of the user device from coords obj
    api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=4MGQZETDBJB3PQFJ833EUNJJC&contentType=json`;
    fetchData();
}

function onError(error) {
    // if any error occur while getting user location then we'll show it in infoText
    alert(error.message);
}

function fetchData() {
    console.log("Getting weather details...");
    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        console.log("Something went wrong");
    });
}

function weatherDetails(info) {
    console.log(info);
    if (info.cod == "404") { // if user entered city name isn't valid
        console.log(`${inputField.value} isn't a valid city name`);
    } else {
        let humidityValue = Math.floor(info.currentConditions.humidity);
        let windSpeedValue = info.currentConditions.windspeed;
        let windDirectionValue = info.currentConditions.winddir;
        let mainTempValue = Math.floor(info.currentConditions.temp);
        let valueLeftComment1 = info.currentConditions.conditions;
        let valueLeftComment2 = info.currentConditions.dew;
        let dayTimeTimeValue = tConvert(info.currentConditions.datetime);
        let dayTimeDayValue = prepareDay(info.days[0].datetimeEpoch);
        let ValueiconLeftComment1 = info.days[0].icon;
        let cityImageValue = info.address;
        let uvIndexValue = info.currentConditions.uvindex;
        let visibilityValue = info.currentConditions.visibility;
        let pressureValue = info.currentConditions.pressure;
        let sunriseValue = tConvert (info.currentConditions.sunrise);
        let sunsetValue = tConvert (info.currentConditions.sunset);

        //putting all data to windwo
        mainTemp.innerText = mainTempValue;
        dayTime.innerHTML = `${dayTimeDayValue}, <span class="time">${dayTimeTimeValue}</span>`;
        leftComment1.innerText = valueLeftComment1;
        leftComment2.innerText = valueLeftComment2;
        iconLeftComment1.src = `./images/${iconSelector(ValueiconLeftComment1)}`;
        bigIcon.src = `./images/${iconSelector(ValueiconLeftComment1)}`;
        //making day circular from today to next 6days
        let start = d.getDay(info.days[0].datetimeEpoch);
        showWeeklyData(start, info.days);
        showUvLevel(uvIndexValue);
        uvIndex.innerText = uvIndexValue;
        humidity.innerText = humidityValue;
        showLevelAsPiller(humidityValue, commentHumidity);
        pressure.innerText = pressureValue;
        showLevelAsPiller(pressureValue, commentPressure);
        windSpeed.innerText = windSpeedValue;
        airDirector(windDirectionValue);
        visibility.innerText = visibilityValue;
        commentVisibility(visibilityValue);
        sunrise.innerText = sunriseValue;
        sunset.innerText = sunsetValue;
        diffSunriseTime = diffTime(info.days[0].sunrise, info.days[1].sunrise);
        diffSunsetTime = diffTime(info.days[0].sunset, info.days[1].sunset);
        sunriseTimeDiffer.innerHTML = `${diffSunriseTime[1]}m ${diffSunriseTime[2]}s`;
        sunsetTimeDiffer.innerHTML = `${diffSunsetTime[1]}m ${diffSunsetTime[2]}s`;
    }
}