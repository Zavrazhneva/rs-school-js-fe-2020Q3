const time = document.getElementById('time');
const date = document.getElementById('date');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const btn = document.querySelector('.btn');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const figureChange = document.querySelector('.figure__change');
const errorText = document.querySelector('.error-text');
const weatherBlock = document.querySelector('.weather__block');


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
getWeather()


async function getWeather() {
        let cityLocalStorage = localStorage.getItem('city');
        if(cityLocalStorage === null) cityLocalStorage = 'Moscow';
        city.innerHTML = cityLocalStorage;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityLocalStorage}&lang=ru&appid=6ed93d000e9fdd858d58b138c07b9c90&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        if(data.cod >= 400) {
            city.innerHTML = cityLocalStorage;
            errorText.innerHTML = 'Город не найден';
            weatherBlock.style.display = 'none';
        } else {
            weatherBlock.style.display = 'block';
            errorText.innerHTML = '';
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${Math.floor(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
        }

}
function setCity(event) {
    localStorage.setItem('city', event.target.innerText);
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
}


btn.addEventListener('click', getImage);
name.addEventListener('keypress',setName);
name.addEventListener('blur',setName);
focus.addEventListener('keypress',setFocus);
focus.addEventListener('click',setFocus);
focus.addEventListener('blur',setFocus);

const showAmPm = true;
const monthText = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const images = ['01.jpg', '02.jpg', '03.jpg','04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const blockquote = document.getElementsByTagName("blockquote")[0];
const cite = document.getElementsByTagName("cite")[0];
const folders = ['night', 'morning', 'day', 'evening'];

let randomImagesArr = [];

folders.forEach(folderName => {
    let randomNumbers = getRandomNumbers();
    for(let i = 0 ; i < randomNumbers.length; i++) {
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
    while(numbers.length < 6) {
        let randomNumber = randomInteger(0, 19);
        if(!numbers.includes(randomNumber)) {
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
    setTimeout(showTime,1000);
}

function addZero(num) {
    return (parseInt(num, 10) < 10 ? '0' : '') + num
}


function setBackgroundGreet() {
    let today = new Date();
    let hour = today.getHours();
    const millsToNextHour = (60 - today.getMinutes())* 60 * 1000;

    setTimeout(() => {
        getImage();
        setBackgroundGreet();
    }, millsToNextHour);

    if(hour >= 6 && hour < 12) {
        greeting.innerHTML = 'Good morning'
    }
    if(hour >= 12 && hour < 18) {
        //day
        greeting.innerHTML = 'Good day'
    }
    if(hour >= 18 && hour < 24) {
        //evening

        greeting.innerHTML = 'Good evening'
    }
    if(hour === 24 || hour < 6) {
        //night
        greeting.innerHTML = 'Good night'
    }
}

function getName() {
    if(localStorage.getItem('name') === null) {
        name.innerHTML = '[enter name]'
    } else {
        name.innerHTML = localStorage.getItem('name')
    }
}

function getFocus() {
    if(localStorage.getItem('focus') === null || localStorage.getItem('focus') === 'enter name') {
        focus.innerHTML = 'enter name'
    } else {
        focus.innerHTML = localStorage.getItem('focus')
    }
}

function setName(event) {
    if(event.type === 'keypress' ) {
        if(event.code === 'Enter' || event.code === 'NumpadEnter') {
            localStorage.setItem('name', event.target.innerText);
            name.blur()
        }
    } else {
        localStorage.setItem('name', event.target.innerText)
    }
}

function setFocus(event) {
    if(event.type ==='click') {
        focus.innerHTML = '';
        return
    }
    if(event.type ==='blur') {
        focus.innerHTML = event.target.innerText;
        localStorage.setItem('focus', event.target.innerText);
        if(event.target.innerText === '') {
            event.target.innerText = 'enter name'
        }
        return
    }
    if(event.type === 'keypress' ) {
        if(event.code === 'Enter' || event.code === 'NumpadEnter') {
            if(event.target.innerText === '') {
                event.target.innerText = 'enter name'
            }
            localStorage.setItem('focus', event.target.innerText);
            focus.blur()
            focus.innerHTML = event.target.innerText;
            getFocus()
        }
    } else {
        localStorage.setItem('focus', event.target.innerText);
    }


}
let currentImage = (new Date()).getHours();

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
    if(currentImage === 23) {
        currentImage = 0
    } else {
        currentImage++;
    }
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
}
getImage();
setBackgroundGreet();
showTime();
getName();
getFocus();