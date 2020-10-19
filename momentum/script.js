const time = document.getElementById('time');
const date = document.getElementById('date');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');

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
    console.log(hour)
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
        //enter
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
        //enter
        if(event.code === 'Enter' || event.code === 'NumpadEnter') {
            localStorage.setItem('focus', event.target.innerText);
            focus.blur()
        }
    } else {
        localStorage.setItem('focus', event.target.innerText)
    }
}
name.addEventListener('keypress',setName);
name.addEventListener('blur',setName);
focus.addEventListener('keypress',setFocus);
focus.addEventListener('blur',setFocus);


setBackgroundGreet()
showTime()
getName()
getFocus()
//if (e.code === 'Enter' || e.code === 'NumpadEnter')