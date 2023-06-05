const input = document.querySelector('.search__form input');
const locationBtn = document.querySelector('#gps');

document.querySelector('.search__form').addEventListener('submit', (e)=>{
    e.preventDefault();
    if (input.value === '') {
        input.setAttribute('placeholder','Input cannot be blank!');
        input.focus();
    } else {
        input.setAttribute('placeholder','Search city...');
        fetchData(input.value);
        input.value = '';
    }
});

function fetchData(city) {
    const apiKey = '1b313cdf265ae4bcf8f1e0a20a460b85';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {displayToday(data)});
}

function displayToday(data) {
    const cityOutput = document.querySelector('.city-output');
    const currentTime = document.querySelector('.current-time');
    const temp = document.querySelector('.today__weather__temp');
    const icon = document.querySelector('.today__weather__icon i');
    const desc = document.querySelector('.today__desc');
    const lastUpdated = document.querySelector('.today__last-updated span');

    cityOutput.textContent = data.name;
}