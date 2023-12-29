const input = document.querySelector(".search__form input");
const locationBtn = document.querySelector("#gps");
const currentTime = document.querySelector(".current-time");
const lastUpdated = document.querySelector(".today__last-updated span");

document.querySelector(".search__form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    input.setAttribute("placeholder", "Input cannot be blank!");
    input.focus();
  } else {
    sessionStorage.setItem("currentCity", input.value);
    input.setAttribute("placeholder", "Search city...");
    fetchToday(input.value);
    fetchHourly(input.value); //will call fetchDaily later
    input.value = "";
  }
});

fetchToday(
  sessionStorage.getItem("currentCity")
    ? sessionStorage.getItem("currentCity")
    : "kuala lumpur"
);
fetchHourly(
  sessionStorage.getItem("currentCity")
    ? sessionStorage.getItem("currentCity")
    : "kuala lumpur"
);

// Today, hourly and tomorrow are 3 different API requests.
// Because of,... budget problems.

function fetchToday(city) {
  const apiKey = "1b313cdf265ae4bcf8f1e0a20a460b85";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayToday(data);
    });
}

function displayToday(data) {
  const cityOutput = document.querySelector(".city-output");
  const temp = document.querySelector(".today__weather__temp");
  const icon = document.querySelector(".today__weather__icon i");
  const desc = document.querySelector(".today__desc");

  cityOutput.textContent = data.name;
  temp.innerHTML = `${Math.round(
    data.main.temp
  )}<span class="today__weather__unit">&deg;C</span>`;

  if (/Rain|Drizzle|Thunderstorm/i.test(data.weather[0].main)) {
    icon.setAttribute("class", "fa-solid fa-cloud-rain");
  } else if (/Clear/i.test(data.weather[0].main)) {
    icon.setAttribute("class", "fa-solid fa-sun");
  } else {
    icon.setAttribute("class", "fa-solid fa-cloud");
  }

  desc.innerHTML = `${data.weather[0].main} &#x2022; Feels like ${Math.round(
    data.main.feels_like
  )}&deg;C`;
}

function fetchHourly(city) {
  const apiKey = "1b313cdf265ae4bcf8f1e0a20a460b85";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayHourly(data))
    .catch((error) => {
      console.log(error);
    });
}

function displayHourly(data) {
  //first, get the latitude and longitude from the data to send to another API;
  //because this API doesn't give daily info, and the other one requires latitude, longitude and timezone;

  let { lat, lon } = data.city.coord;
  fetchDaily(lat, lon);

  //get 6 timestamps
  let timeCtn = document.querySelector(".hourly__time");
  timeCtn.innerHTML = "";
  for (let i = 0; i <= 5; i++) {
    let hour24 = new Date(data.list[i].dt * 1000).getHours();
    let hour12 = "";
    if (hour24 >= 12) {
      hour12 += "pm";
    } else {
      hour12 += "am";
    }

    hour12 = (hour24 % 12 || 12) + hour12;

    timeCtn.innerHTML += `<div class="time__item"><p class="time__text">${hour12}</p></div>`;
  }

  //draw the line chart
  let chartCtn = document.querySelector(".hourly__chart");
  chartCtn.innerHTML = "";
  let dataArray = [];
  for (let i = 0; i <= 6; i++) {
    dataArray.push({
      temp: data.list[i].main.temp, //temp:30
      main: data.list[i].weather[0].main, //main:'Rain'
    });
  }

  for (let i = 0; i < 5; i++) {
    let ratio =
      (dataArray[i].temp - Math.min(...dataArray.map((i) => i.temp))) /
      (Math.max(...dataArray.map((i) => i.temp)) -
        Math.min(...dataArray.map((i) => i.temp)));

    nextRatio =
      (dataArray[i + 1].temp - Math.min(...dataArray.map((i) => i.temp))) /
      (Math.max(...dataArray.map((i) => i.temp)) -
        Math.min(...dataArray.map((i) => i.temp)));

    if (i === 4) {
      chartCtn.innerHTML += `<div class="chart--item">
                                <div class="chart--temp" style="top: ${
                                  50 * (1 - ratio) - 15
                                }%">${Math.round(dataArray[i].temp)}&deg;C</div>
                                <div class="chart--temp last"style="top: ${
                                  50 * (1 - nextRatio) - 15
                                }%">${Math.round(
        dataArray[i + 1].temp
      )}&deg;C</div>
                                <div class="chart--line" style="clip-path: polygon(0 ${
                                  50 * (1 - ratio)
                                }%, 100% ${
        50 * (1 - nextRatio)
      }%, 100% 100%, 0 100%)"></div></div>`;
    } else {
      chartCtn.innerHTML += `<div class="chart--item">
                                    <div class="chart--temp" style="top: ${
                                      50 * (1 - ratio) - 15
                                    }%">${Math.round(
        dataArray[i].temp
      )}&deg;C</div>
                                    <div class="chart--line" style="clip-path: polygon(0 ${
                                      50 * (1 - ratio)
                                    }%, 100% ${
        50 * (1 - nextRatio)
      }%, 100% 100%, 0 100%)"></div>
                                </div>`;
    }
  }
}

function fetchDaily(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayDaily(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

let globalData;
let dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function wmoCodeToIconClass(code) {
  if (code == 0) {
    return "fa-solid fa-sun";
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 99)) {
    return "fa-solid fa-cloud-rain";
  } else {
    return "fa-solid fa-cloud";
  }
}

function displayDaily(data) {
  globalData = data;
  let dailyCtn = document.querySelector(".daily__day__ctn");
  dailyCtn.innerHTML = "";

  //looping 5 times to print 5 days
  for (let i = 0; i <= 4; i++) {
    let day = dayArray[new Date(data.daily.time[i]).getDay()].toUpperCase();

    dailyCtn.innerHTML += `<div class="daily__day">
        <div class="daily__day__title">${i == 0 ? "TODAY" : day}</div>
        <div class="daily__day__icon">
            <i class="${wmoCodeToIconClass(data.daily.weathercode[i])}"></i>
        </div>
        <div class="daily__day__lohi">
            <span class="deg-low">${Math.round(
              data.daily.temperature_2m_min[i]
            )}/</span>
            <span class="deg-high">${Math.round(
              data.daily.temperature_2m_max[i]
            )}°C</span>
        </div>
    </div>`;
  }
}
