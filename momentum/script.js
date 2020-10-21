const time = document.getElementById('time');
const date = document.getElementById('date');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const btn = document.querySelector('.btn');

btn.addEventListener('click', getImage);
name.addEventListener('keypress',setName);
name.addEventListener('blur',setName);
focus.addEventListener('keypress',setFocus);
focus.addEventListener('blur',setFocus);

const showAmPm = true;
const monthText = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        minute = today.getMinutes(),
        second = today.getSeconds(),
        day = today.getDate(),
        month = today.getMonth(),
        dayWeek = today.getDay()

    const amOrPm = hour >= 12 ? 'pm': 'am ';

    time.innerHTML = `${addZero(hour)}:${addZero(minute)}:${addZero(second)} ${showAmPm ? amOrPm : ''}`;
    date.innerHTML = `${daysInWeek[dayWeek]} ${day} ${monthText[month]}`;
    setTimeout(showTime,1000);
}

function addZero(num) {
    return (parseInt(num, 10) < 10 ? '0' : '') + num
}

function setBackgroundGreet() {
    let today = new Date(),
        hour = today.getHours();
    if(hour > 6 && hour < 12) {
        //morning
        document.body.style.backgroundImage = "url('assets/images/night/01.jpg')";
        greeting.innerHTML = 'Good morning'
    }
    if(hour > 12 && hour < 18) {
        //day
        document.body.style.backgroundImage = "url('assets/images/day/01.jpg')";
        greeting.innerHTML = 'Good day'
    }
    if(hour > 18 && hour < 24) {
        //evening
        document.body.style.backgroundImage = "url('assets/images/evening/01.jpg')";
        greeting.innerHTML = 'Good evening'
    }
    if(hour === 24 || hour < 6) {
        //night
        document.body.style.backgroundImage = "url('assets/images/night/01.jpg')";
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
    if(localStorage.getItem('focus') === null) {
        focus.innerHTML = '[enter name]'
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
    if(event.type === 'keypress' ) {
        if(event.code === 'Enter' || event.code === 'NumpadEnter') {
            localStorage.setItem('focus', event.target.innerText);
            focus.blur()
        }
    } else {
        localStorage.setItem('focus', event.target.innerText)
    }
}
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
        console.log(src)
    };
}
function getImage() {
    const index = i % images.length;
    const imageSrc = 'assets/images/day/' + images[index];
    viewBgImage(imageSrc);
    i++;
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1000);
}

setBackgroundGreet();
showTime();
getName();
getFocus();