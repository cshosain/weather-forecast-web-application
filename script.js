let inputField = document.querySelector('input');
let searchBtn = document.getElementById('searchBtn');
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
let dailyElem = document.querySelectorAll('.day');
let hourlyElem = document.querySelectorAll('.hour');
let scrollContainer = document.querySelector('.right-midde-1');
let hours = document.querySelectorAll('.hour')
let underline = document.querySelector('.animation');
let leftBg = document.querySelector('.left');
let rightBg = document.querySelector('.right');
let highlights = document.querySelectorAll('.highlight');
let navA = document.querySelectorAll('nav a');
let navAunderline = document.querySelector('nav .animation ');
let iconColor = document.querySelectorAll('.fa-solid');
let changeModeBtn = document.getElementById('changeModeBtn');
let celsBtn = document.getElementById('celsBtn');
let farhBtn = document.getElementById('farhBtn');
let tempUnit = document.getElementById('tempUnit');
let cityNameDisplay = document.getElementById('cityNameDisplay');
let displayText = document.getElementById('displayText');
let public1;
let public2;
let untiMode = 'cel';

let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let weeklyIconSrc = "";
const d = new Date();
// I need to show 7 days data from today that's why finding todays day index among 7days of a week as sunday = 0, monday = 1 and so on.
//here today's name is returning for update left side day name which is performed in weatherDetails function.
function prepareDay(miliSec) {
    let dayIndex = d.getDay(miliSec);
    return dayArr[dayIndex];
}

// transformed data updating at the specific place in the DOM
function updateToFar() {
    untiMode = 'far';
    if (public1 && public2) {
        for (let i = 0; i < 7; i++) {
            document.getElementById(`weeklyTmax${i}`).innerHTML = toFahrenheit(public1[i].tempmax) + '°';
            document.getElementById(`weeklyTmin${i}`).innerHTML = toFahrenheit(public1[i].tempmin) + '°';
        }
        for (let j = 0; j < 24; j++) {
            document.getElementById(`hourlyTemp${j}`).innerHTML = toFahrenheit(public2.days[0].hours[j].temp) + '°';
            document.getElementById(`hourlyFeelslike${j}`).innerHTML = toFahrenheit(public2.days[0].hours[j].feelslike) + '°';
        }
        mainTemp.innerText = toFahrenheit(public2.currentConditions.temp);
        tempUnit.innerText = '°F';
        celsBtn.style.border = 'none';
        farhBtn.style.border = '2px solid orange';
    }
    else {
        alert('Enter a city name first');
    }
}

function updateToCel() {
    untiMode = 'cel';
    if (public1 && public2) {
        for (let i = 0; i < 7; i++) {
            document.getElementById(`weeklyTmax${i}`).innerHTML = public1[i].tempmax + '°';
            document.getElementById(`weeklyTmin${i}`).innerHTML = public1[i].tempmin + '°';
        }
        for (let j = 0; j < 24; j++) {
            document.getElementById(`hourlyTemp${j}`).innerHTML = public2.days[0].hours[j].temp + '°';
            document.getElementById(`hourlyFeelslike${j}`).innerHTML = public2.days[0].hours[j].feelslike + '°';
        }
        mainTemp.innerText = Math.round(public2.currentConditions.temp);
        tempUnit.innerText = '°c';
        farhBtn.style.border = 'none';
        celsBtn.style.border = '2px solid orange';
    }
    else {
        alert('Enter a city name first');
    }
}
farhBtn.addEventListener('click', updateToFar);
celsBtn.addEventListener('click', updateToCel);
changeModeBtn.addEventListener('click', changeMode);

function toFahrenheit(cTemp) {
    return Math.round(cTemp * 9 / 5 + 32);
}
// function for select icon according to data from API
function iconSelector(icon) {
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
function showWeeklyData(startDay, infoDays) {
    public1 = infoDays;
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
            <p> <span id = "weeklyTmax${i}" class="every-day-high">${infoDays[i].tempmax}°</span> <span id = "weeklyTmin${i}" class="every-day-low">${infoDays[i].tempmin}°</span></p>
            </div>`;

    }
}
function showUvLevel(value) {
    let x = 135 + (value * (180 / 15));
    uvLevel.style.transform = `rotate(${x}deg)`;
}

function commentHumidity(value) {

    if (value < 30) {
        humidityComment.innerHTML = `Too Dry &#128078`;
    }
    else if (value >= 30 && value <= 50) {
        humidityComment.innerHTML = `Optimum &#128077`;
    }
    else {
        humidityComment.innerHTML = `Wet &#128078`;
    }
}

function commentPressure(value) {
    value += 990;
    if (value < 1000) {
        console.log(value)
        pressureComment.innerHTML = `Low &#128078`;
    }
    else if (value > 1020) {
        console.log(value)
        pressureComment.innerHTML = `High &#128078`;
    }
    else {
        console.log(value)
        pressureComment.innerHTML = `Optimum &#128077`;
    }
}
function commentVisibility(value) {
    if (value > 0.2 && value <= 0.5) {
        visibilityComment.innerHTML = 'Moderate Fog &#128577';
    }
    else if (value > 0.5 && value <= 1) {
        visibilityComment.innerHTML = 'Light Fog &#128577';
    }
    else if (value > 1 && value <= 2) {
        visibilityComment.innerHTML = 'Thin Fog &#128577';
    }
    else if (value > 2 && value <= 4) {
        visibilityComment.innerHTML = ' Haze &#128577';
    }
    else if (value > 4 && value <= 10) {
        visibilityComment.innerHTML = 'Light Haze &#128577';
    }
    else if (value > 10 && value <= 200) {
        visibilityComment.innerHTML = 'Clear &#128577';
    }
    else if (value > 20 && value <= 50) {
        visibilityComment.innerHTML = 'Very Clear &#128577';
    }
    else if (value > 50) {
        visibilityComment.innerHTML = 'Exceptionally Clear &#128577';
    }
    else {
        visibilityComment.innerHTML = 'Pure Air &#128577';
    }
}
function showLevelAsPiller(value, callback) {
    //if block for pressure else block for uv level.
    let x;
    if (value > 100) {
        //show pressue at the scale size 40. (990 to 1030)
        value -= 990;
        x = (40 / 40.0) * value;
        pressureLevel.style.bottom = `${x}px`;
        pressureLevel.style.border = `9px solid rgb(${64 + (value * 1.71)}, ${80 - (value * 0.8)}, ${210 - (value * 2.21)})`;
    }
    else {
        x = (67 / 100.0) * value;
        humidityLevel.style.bottom = `${x}px`;
        humidityLevel.style.border = `9px solid rgb(${64 + (value * 1.71)}, ${80 - (value * 0.8)}, ${210 - (value * 2.21)})`;
    }

    callback(value);
}
function airDirector(deg) {
    switch (true) {
        case (deg == 0 || deg == 360): {
            directionImage.src = './images/north.png';
            directionComment.innerText = 'N';
            break;
        }

        case deg == 45: {
            directionImage.src = './images/east-north.png';
            directionComment.innerText = 'NE';
            break;
        }

        case deg == 90: {
            directionImage.src = './images/east.png';
            directionComment.innerText = 'E';
            break;
        }

        case deg == 135: {
            directionImage.src = './images/east-south.png';
            directionComment.innerText = 'SE';
            break;
        }

        case deg == 180: {
            directionImage.src = './images/south.png';
            directionComment.innerText = 'S';
            break;
        }

        case deg == 225: {
            directionImage.src = './images/west-south.png';
            directionComment.innerText = 'SW';
            break;
        }

        case deg == 270: {
            directionImage.src = './images/west.png';
            directionComment.innerText = 'W';
            break;
        }

        case deg == 315: {
            directionImage.src = './images/west-north.png';
            directionComment.innerText = 'NW';
            break;
        }

        case (deg > 0 && deg < 45): {
            directionImage.src = './images/north.png';
            directionComment.innerText = 'NNE';
            break;
        }

        case (deg > 45 && deg < 90): {
            directionImage.src = './images/east.png';
            directionComment.innerText = 'ENE';
            break;
        }

        case (deg > 90 && deg < 135): {
            directionImage.src = './images/east.png';
            directionComment.innerText = 'ESE';
            break;
        }

        case (deg > 135 && deg < 180): {
            directionImage.src = './images/south.png';
            directionComment.innerText = 'SSE';
            break;
        }

        case (deg > 180 && deg < 225): {
            directionImage.src = './images/south.png';
            directionComment.innerText = 'SSW';
            break;
        }

        case (deg > 225 && deg < 270): {
            directionImage.src = './images/west.png';
            directionComment.innerText = 'WSW';
            break;
        }

        case (deg > 270 && deg < 315): {
            directionImage.src = './images/west.png';
            directionComment.innerText = 'WNW';
            break;
        }

        case (deg > 315 && deg < 360): {
            directionImage.src = './images/north.png';
            directionComment.innerText = 'NNW';
            break;
        }

        default:
            break;
    }
}
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    time[3] = ' ';
    return time.join(''); // return adjusted time or original string
}
let prepared
function hourlyTConv(onlyHour) {
    if (onlyHour < 12) {
        if (onlyHour == 0) {
            prepared = '12:00 AM';
        }
        else {
            prepared = onlyHour + ':' + '00' + ':' + 'AM';
        }

    }
    else {
        if (onlyHour == 12) {
            prepared = '12:00 PM';
        }
        else {
            onlyHour -= 12;
            prepared = onlyHour + ':' + '00' + ':' + 'PM';
        }
    }
    return prepared;
}
//function for differentiate today and tomorrow sunrise and sunset time
function diffTime(time1, time2) {
    let hour1 = time1.split(':')[0];
    let hour2 = time2.split(':')[0];
    let min1 = time1.split(':')[1];
    let min2 = time2.split(':')[1];
    let sec1 = time1.split(':')[2];
    let sec2 = time2.split(':')[2];

    let diff_hour = hour2 - hour1;
    let diff_min = min2 - min1;
    let diff_sec = sec2 - sec1;
    if (diff_hour < 0) {
        diff_hour += 24;
    }
    if (diff_min < 0) {
        diff_min += 60;
    } else if (diff_min >= 60) {
        diff_min -= 60;
        diff_hour++;
    }
    if (diff_sec < 0) {
        diff_sec += 60;
        diff_min--;
    } else if (diff_sec >= 60) {
        diff_min -= 60;
        diff_min++;
    }
    return ([diff_hour, diff_min, diff_sec]);

}

let api;

inputField.addEventListener("keyup", e => {
    // if user pressed enter btn and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

function searchBtnApiCalling() {
    if (inputField.value != "") {
        requestApi(inputField.value);
    }
}
searchBtn.addEventListener("click", searchBtnApiCalling);

function doBlur(status) {
    if (status == 'yes') {
        leftBg.style.filter = 'blur(8px)';
        rightBg.style.filter = 'blur(8px)';
        displayText.style.display = 'block';
        displayText.style.zIndex = '2';

    }
    else {
        leftBg.style.filter = 'none';
        rightBg.style.filter = 'none';
        displayText.style.display = 'none';
    }
}
function getCurrentLocation() {
    if (navigator.geolocation) { // if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
}
getCurrentLocation();
locBtn.addEventListener("click", () => {
    getCurrentLocation();
    inputField.value = '';
});
//normal API url preparing according to input field data
function requestApi(city) {
    api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=4MGQZETDBJB3PQFJ833EUNJJC&contentType=json`;
    fetchData();
}
var latAndLong;
let yourLoc;
//geo location success state API url pretaring
function onSuccess(position) {
    let { latitude, longitude } = position.coords; // getting lat and lon of the user device from coords obj
    latAndLong = latitude + ',' + longitude;
    //making asyncronous while preparing public2 which is main info from API. If lat gets location as lat and long then display 'your location'
    setTimeout(() => {
        if (public2.address == latAndLong) {
            yourLoc = 'Your Location';
        }
        else {
            yourLoc = public2.address;
        }
        cityNameDisplay.innerHTML = `<h2>${yourLoc}</h2>`;
    }, 2000);

    api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=4MGQZETDBJB3PQFJ833EUNJJC&contentType=json`;
    fetchData();
}

function onError(error) {
    // if any error occur while getting user location then we'll show it in infoText
    alert(error.message);
}

function fetchData() {
    console.log("Getting weather details...");
    doBlur('yes');
    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        alert("Something went wrong");
    });
}
function showDaily() {
    hourlyElem.forEach(element => {
        element.style.display = 'none';
    });

    dailyElem.forEach(element => {
        element.style.display = 'flex';
    });
    underline.style.left = '78px';
    scrollContainer.style.overflowX = 'hidden';
}

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});


function showHourly() {
    dailyElem.forEach(element => {
        element.style.display = 'none';
    });

    hourlyElem.forEach(element => {
        element.style.display = 'flex';
    });
    underline.style.left = '0px';
    // scrollContainer.style.overflowX = 'scroll';

}

function createHourlyInfo(info) {
    public2 = info;
    for (let i = 0; i < 24; i++) {
        hours[i].innerHTML = `<div>
                <h5 class="hourlyTime">${hourlyTConv(i)}</h5>
            </div>
            <div>
                <p id="hourlyTemp${i}" class="hourlyTemp">${info.days[0].hours[i].temp}°</p>
            </div>
            <div class="smaller">
                <div>
                    <div>
                        <p>Feels like:</p>
                    </div>
                    <div>
                        <p>Humidity:</p>
                    </div>
                    <div><p>Visibility:</p></div>
                </div>
                <div>
                    <div><p id="hourlyFeelslike${i}">${info.days[0].hours[i].feelslike}</p></div>
                    <div><p>${info.days[0].hours[i].humidity}</p></div>
                    <div><p>${info.days[0].hours[i].visibility} km</p></div>
                </div>
            </div>`;

    }

}

//aplying dynamic color to all element which are array type such as nodelist, html collection
function applyColorToAll(arr, backColor, Color) {
    arr.forEach(element => {
        element.style.backgroundColor = backColor;
        element.style.color = Color;
        element.style.transition = '1s';
    });
}

//changing color and bg according to the icon is sun or moon class.
function changeMode() {
    if (changeModeBtn.firstChild.classList.contains('fa-moon')) {
        // mode = 'night';
        inputField.style.color = 'wheat';
        inputField.style.backgroundColor = 'transparent';
        inputField.classList.add('changedPlaceholderCol');
        inputField.style.transition = '.7s';
        leftBg.style.backgroundColor = '#0D1117';
        leftBg.style.transition = '.7s';
        leftBg.style.color = 'wheat';
        rightBg.style.backgroundColor = '#161B22';
        rightBg.style.color = 'wheat';
        rightBg.style.transition = '.7s';
        locBtn.style.backgroundColor = 'black';
        locBtn.style.transition = '.7s';
        navAunderline.style.backgroundColor = '#069cdd';
        navAunderline.style.transition = '.7s';
        applyColorToAll(hourlyElem, '#1B242E', 'wheat');
        applyColorToAll(dailyElem, '#1B242E', 'wheat');
        applyColorToAll(highlights, '#1B242E', 'wheat');
        applyColorToAll(navA, 'transparent', 'wheat');
        applyColorToAll(iconColor, 'transparent', 'wheat');
        iconLeftComment2.style.filter = 'invert(100%)';
        iconLeftComment2.style.transition = '.7s';
        changeModeBtn.firstChild.classList.replace('fa-moon', 'fa-sun');
        changeModeBtn.style.transition = '.7s';
    }
    else {
        // mode = 'day';
        inputField.style.color = 'black';
        inputField.style.backgroundColor = 'transparent';
        inputField.classList.remove('changedPlaceholderCol');
        leftBg.style.backgroundColor = 'white';
        leftBg.style.color = 'black';
        rightBg.style.backgroundColor = '#F6F6F8';
        rightBg.style.color = 'black';
        locBtn.style.backgroundColor = 'white';
        navAunderline.style.backgroundColor = 'black';
        applyColorToAll(hourlyElem, 'white', 'black');
        applyColorToAll(dailyElem, 'white', 'black');
        applyColorToAll(highlights, 'white', 'black');
        applyColorToAll(navA, 'transparent', 'gray');
        applyColorToAll(iconColor, 'transparent', 'black');
        iconLeftComment2.style.filter = 'none';
        changeModeBtn.firstChild.classList.replace('fa-sun', 'fa-moon');
        changeModeBtn.firstChild.style.color = 'gold';
    }
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
        let sunriseValue = tConvert(info.currentConditions.sunrise);
        let sunsetValue = tConvert(info.currentConditions.sunset);

        //putting all data to windwo
        doBlur('no');
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
        createHourlyInfo(info);

        // console.log(latitude);
        cityNameDisplay.innerHTML = `<h2>${inputField.value.toUpperCase()}</h2>`;
        //if user has selected Fahrenheit mode already then calling once updateToFar function to stay data Fahrenheit unit in the case of new location request
        //else window is celcious mode so no required to convertion because data comming from API already cecious unit mode.
        if (untiMode == 'far') {
            updateToFar();
        }

    }
}