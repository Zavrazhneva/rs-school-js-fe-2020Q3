const sliderWrapper = document.getElementsByClassName('slider__wrapper')[0];
const sliderControl = document.getElementsByClassName('slider__control');
let arrButtons = document.getElementsByClassName('card__link');
addEventListenerButtonCard(arrButtons);

sliderWrapper.innerHTML = renderPets( [4, 0, 2],3).join('');

 window.addEventListener('resize', () => {
     sliderWrapper.innerHTML =  renderPets(getRandomNumbers()).join('');
});


function renderPet(pet) {
    return `<article class="card">
                <div class="card__img-wrapper">
                    <img src="${pet.img}" alt="${pet.name}" class="slide__img">
                </div>
        
                <div class="card-descript__wrapper">
                    <h4 class="card__title">${pet.name}</h4>
                    <button data-id="${pet.name}" class="card__link button button--transparent">Learn more</button>
                </div>
              </article>`
}

function renderPets(randomNumbers = [4, 0, 2]) {
    let resizeCurrent = 3;
    if(window.innerWidth < 1280) {
        resizeCurrent = 2
    }
    if(window.innerWidth < 767) {
        resizeCurrent = 1
    }
    let petsHtml = [];
    for (let i = 0; i < resizeCurrent; i++) {
        petsHtml.push(renderPet(PETS[randomNumbers[i]]))
    }
    return petsHtml
}
let oldRandomNumber = [];
function getRandomNumbers() {
    let currentGenerateRandom = 3;
    if(window.innerWidth < 1280) {
        currentGenerateRandom = 2
    }
    if(window.innerWidth < 767) {
        currentGenerateRandom = 1
    }

    let randomNumbers = [];
    while (randomNumbers.length < currentGenerateRandom) {
        let randomNumber = Math.floor(Math.random() * 10);
        oldRandomNumber.push(randomNumber);
        if (!randomNumbers.includes(randomNumber) && randomNumber < 8 ) {
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers
}

[].forEach.call(sliderControl, (item) => {
    item.addEventListener('click', () => {
        sliderWrapper.innerHTML = renderPets(getRandomNumbers()).join('');
        let arrButtons = document.getElementsByClassName('card__link');
        addEventListenerButtonCard(arrButtons)
    })
});

let burgerMenuFlag = true;
const burgerButton = document.getElementsByClassName('burger')[0];
const burgerMenu = document.getElementsByClassName('burger__menu')[0];
const burgerLogo = document.getElementsByClassName('burger__logo')[0];
const logo = document.getElementsByClassName('logo')[0];

burgerButton.addEventListener('click', () => {
    if (burgerMenuFlag) {
        burgerMenu.style.display = 'flex';
        burgerLogo.style.display = 'block';
        document.body.style.overflow = 'hidden';
        logo.style.display = 'none';
        burgerMenuFlag = false;
        burgerButton.classList.add('burger--click');
        burgerButton.classList.remove('burger--prev-click');
        burgerMenu.classList.add('burger__menu--open');
        burgerMenu.classList.remove('burger__menu--close');
    } else {
        burgerMenuFlag = true;
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            logo.style.display = 'block';
        }, 2000)

        burgerButton.classList.add('burger--prev-click');
        burgerMenu.classList.add('burger__menu--close');
        burgerMenu.classList.remove('burger__menu--open');
    }
});
const popup = document.getElementById('popup');

function renderPopupPets(e) {
    let petName = e.target.dataset.id
    return PETS.filter(item => {
        return item.name === petName
    })[0];
}

function renderHtmlPopupPets(pet) {
    return `<div class="popup__block">
                <div class="popup_close"></div>
                    <img src="${pet.img}" alt="${pet.name}" class="popup__img">
                <div class="popup-descript__wrapper">
                    <h4 class="popup__title">${pet.name}</h4>
                    <p class="popup__subtitle">${pet.type} - ${pet.breed}</p>
                    <p class="popup__description">${pet.description}</p>
                    <ul class="popup__list">
                        <li class="popup__item"><span>Age:</span> ${pet.age}</li>
                        <li class="popup__item"><span>Inoculations:</span> ${pet.inoculations}</li>
                        <li class="popup__item"><span>Diseases:</span> ${pet.diseases}</li>
                        <li class="popup__item"><span>Parasites:</span> ${pet.parasites}</li>
                    </ul>
  
                </div>
              </div>`
}
function addEventListenerButtonCard(arrayButtons) {

    [].forEach.call(arrayButtons, (item) => {

        item.addEventListener('click', (e) => {

            document.body.classList.add('overflow');
            popup.innerHTML = renderHtmlPopupPets(renderPopupPets(e));
            popup.style.display = 'flex';
            const popupClose = document.getElementsByClassName('popup_close')[0];
            popupClose.addEventListener('click', () => {
                popup.style.display = 'none';
                document.body.classList.remove('overflow');
            })


        })
    });
}
