const input = document.querySelector('.search__form input');
const locationBtn = document.querySelector('#gps');
const currentTime = document.querySelector('.current-time');
const lastUpdated = document.querySelector('.today__last-updated span');

document.querySelector('.search__form').addEventListener('submit', (e)=>{
    e.preventDefault();
    if (input.value === '') {
        input.setAttribute('placeholder','Input cannot be blank!');
        input.focus();
    } else {
        input.setAttribute('placeholder','Search city...');
        fetchToday(input.value);
        fetchHourly(input.value);
        input.value = '';
    }
});

// Today, hourly and tomorrow are 3 different API requests.
// Because of,... budget problems.

function fetchToday(city) {
    const apiKey = '1b313cdf265ae4bcf8f1e0a20a460b85';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {displayToday(data)});
}

function displayToday(data) {
    const cityOutput = document.querySelector('.city-output');
    const temp = document.querySelector('.today__weather__temp');
    const icon = document.querySelector('.today__weather__icon i');
    const desc = document.querySelector('.today__desc');

    cityOutput.textContent = data.name;
    temp.innerHTML = `${Math.round(data.main.temp)}<span class="today__weather__unit">&deg;C</span>`;
    
    if (/Rain|Drizzle|Thunderstorm/i.test(data.weather[0].main)) {
        icon.setAttribute('class','fa-solid fa-cloud-rain');
    } else if (/Clear/i.test(data.weather[0].main)) {
        icon.setAttribute('class','fa-solid fa-sun');
    } else {
        icon.setAttribute('class','fa-solid fa-cloud');
    }

    desc.innerHTML = `${data.weather[0].main} &#x2022; Feels like ${Math.round(data.main.feels_like)}&deg;C`;
}

function fetchHourly(city) {
    const apiKey = '1b313cdf265ae4bcf8f1e0a20a460b85';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayHourly(data))
        .catch((error) => {console.log(error)});
}

function displayHourly(data) {
    
    //get 6 timestamps
    let timeCtn = document.querySelector('.hourly__time');
    timeCtn.innerHTML = '';
    for (let i = 0; i <= 5; i++) {
        let hour24 = new Date(data.list[i].dt * 1000).getHours();
        let hour12 = '';
        if ( hour24 >= 12) {
            hour12 += 'pm';
        } else {
            hour12 += 'am';
        }
        
        hour12 = (hour24 % 12 || 12) + hour12;

        timeCtn.innerHTML += `<div class="time__item"><p class="time__text">${hour12}</p></div>`
    }

    //draw the line chart
    let chartCtn = document.querySelector('.hourly__chart');
    chartCtn.innerHTML = '';
    let dataArray = [];
    for (let i = 0; i <= 6; i++) {
        dataArray.push({
            temp: data.list[i].main.temp,               //temp:30
            main: data.list[i].weather[0].main          //main:'Rain'
        })
    }

    for (let i = 0; i < 5; i++) {
        let ratio = (dataArray[i].temp - Math.min(...dataArray.map((i) => i.temp))) / (Math.max(...dataArray.map((i) => i.temp)) - Math.min(...dataArray.map((i) => i.temp)));

        nextRatio = (dataArray[i+1].temp - Math.min(...dataArray.map((i) => i.temp))) / (Math.max(...dataArray.map((i) => i.temp)) - Math.min(...dataArray.map((i) => i.temp)));

        if (i === 4) {
            chartCtn.innerHTML += `<div class="chart--item">
            <div class="chart--temp" style="top: ${(50 * (1-ratio)) - 15}%">${Math.round(dataArray[i].temp)}&deg;C</div>
            <div class="chart--temp last"style="top: ${(50 * (1-nextRatio)) - 15}%">${Math.round(dataArray[i+1].temp)}&deg;C</div>
            <div class="chart--line" style="clip-path: polygon(0 ${50 * (1-ratio)}%, 100% ${50 * (1-nextRatio)}%, 100% 100%, 0 100%)"></div>
        </div>`;
        } else {
            chartCtn.innerHTML += `<div class="chart--item">
                                    <div class="chart--temp" style="top: ${(50 * (1-ratio)) - 15}%">${Math.round(dataArray[i].temp)}&deg;C</div>
                                    <div class="chart--line" style="clip-path: polygon(0 ${50 * (1-ratio)}%, 100% ${50 * (1-nextRatio)}%, 100% 100%, 0 100%)"></div>
                                </div>`;
        }

                         
    }
}