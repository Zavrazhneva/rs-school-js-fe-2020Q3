const time = document.getElementById('time');
const date = document.getElementById('date');
const greeting = document.getElementById('greeting');
const btn = document.querySelector('.btn');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const figureChange = document.querySelector('.figure__change');
const errorText = document.querySelector('.error-text');
const weatherBlock = document.querySelector('.weather__block');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const monthText = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const blockquote = document.getElementsByTagName("blockquote")[0];
const cite = document.getElementsByTagName("cite")[0];
const folders = ['night', 'morning', 'day', 'evening'];
const placeholders = {
    todo : '[Enter todo]',
    name : '[Enter name]',
    city : '[Enter city]'
}
let randomImagesArr = [];
let currentImage = (new Date()).getHours();
const fields = {
    todo: document.getElementById('focus'),
    name: document.getElementById('name'),
    city: document.querySelector('.city'),
}
Object.values(fields).forEach(element => {
    element.addEventListener('keypress', fieldHandler);
    element.addEventListener('click', fieldHandler);
    element.addEventListener('blur', fieldHandler);
})

btn.addEventListener('click', getImage);

let previousWeatherCity = '';
async function getWeather() {
    const storedValue = localStorage.getItem('city');
    if (!storedValue) {
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${storedValue}&lang=ru&appid=6ed93d000e9fdd858d58b138c07b9c90&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod >= 400) {
        errorText.innerHTML = 'Город не найден';
        weatherBlock.style.display = 'none';
    } else {
        weatherBlock.style.display = 'block';
        errorText.innerHTML = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.innerHTML = `Влажность: ${Math.floor(data.main.humidity)} %`;
        wind.innerHTML = `Скорость ветра:  ${Math.floor(data.wind.speed)} м/с`;
    }
    previousWeatherCity = storedValue;
}

folders.forEach(folderName => {
    let randomNumbers = getRandomNumbers();
    for (let i = 0; i < randomNumbers.length; i++) {
        randomImagesArr.push(`assets/images/${folderName}/${randomNumbers[i]}`)
    }
})

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function getRandomNumbers() {
    const numbers = [];
    const numbersImage = []
    while (numbers.length < 6) {
        let randomNumber = randomInteger(0, 19);
        if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
            numbersImage.push(images[randomNumber]);
        }
    }
    return numbersImage
}

fetch('https://type.fit/api/quotes').then(res => res.json()).then(list => {
    function randomQuote() {
        let randomNumberQuote = randomInteger(1, list.length);
        let randomQuote = list[randomNumberQuote];
        cite.innerHTML = randomQuote.author;
        blockquote.innerHTML = randomQuote.text;
    }

    randomQuote()
    figureChange.addEventListener('click', () => {
        randomQuote()
    })
})

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        minute = today.getMinutes(),
        second = today.getSeconds(),
        day = today.getDate(),
        month = today.getMonth(),
        dayWeek = today.getDay()
    time.innerHTML = `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
    date.innerHTML = `${daysInWeek[dayWeek]} ${day} ${monthText[month]}`;
    setTimeout(showTime, 1000);
}

function addZero(num) {
    return (parseInt(num, 10) < 10 ? '0' : '') + num
}

function setBackgroundGreet() {
    let today = new Date();
    let hour = today.getHours();
    const millsToNextHour = ((60 - today.getMinutes()) * 60 * 1000) - today.getSeconds() * 1000;

    setTimeout(() => {
        getImage();
        setBackgroundGreet();
    }, millsToNextHour);

    if (hour >= 6 && hour < 12) {
        greeting.innerHTML = 'Good morning'
    }
    if (hour >= 12 && hour < 18) {
        //day
        greeting.innerHTML = 'Good day'
    }
    if (hour >= 18 && hour < 24) {
        //evening
        greeting.innerHTML = 'Good evening'
    }
    if (hour === 24 || hour < 6) {
        //night
        greeting.innerHTML = 'Good night'
    }
}

function fieldHandler(event) {
    const fieldId = event.currentTarget.getAttribute('data-id');

    function onEditingEnd() {

        if (!event.currentTarget.innerText && fieldId === 'city' && previousWeatherCity) {
            event.currentTarget.innerText = previousWeatherCity;
            return;
        }

        if (event.currentTarget.innerText === '' ) {
            event.currentTarget.innerText = placeholders[fieldId];
        } else {
            localStorage.setItem(fieldId , event.currentTarget.innerText);
        }
    }

    switch (event.type) {
        case 'click' : {
            event.currentTarget.innerText = '';
            return;
        }
        case 'blur' : {
            onEditingEnd();
            if (fieldId === 'city') {
                getWeather();
            }
            return;
        }
        case 'keypress' : {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                event.currentTarget.blur();
            }
            return
        }
    }
}

function renderFieldsContent() {
    Object.entries(fields).forEach(([name, element]) => {
        const storedValue = localStorage.getItem(name);
        element.innerText = storedValue || placeholders[name];
    })
}

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

function getImage() {
    const imageSrc = randomImagesArr[currentImage];
    viewBgImage(imageSrc);
    if (currentImage === 23) {
        currentImage = 0
    } else {
        currentImage++;
    }
    btn.disabled = true;
    setTimeout(function () {
        btn.disabled = false
    }, 1000);
}

getImage();
setBackgroundGreet();
showTime();
getWeather();
renderFieldsContent();
