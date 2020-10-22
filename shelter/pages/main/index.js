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

function renderPets(randomNumbers = [1, 2, 3]) {
    let petsHtml = [];
    for (let i = 0; i < randomNumbers.length; i++) {
        petsHtml.push(renderPet(PETS[randomNumbers[i]]))
    }
    return petsHtml
}

function getRandomNumbers() {
    let randomNumbers = [];
    while (randomNumbers.length < 3) {
        let randomNumber = Math.floor(Math.random() * 10)
        if (!randomNumbers.includes(randomNumber) && randomNumber < 8) {
            randomNumbers.push(randomNumber)
        }
    }
    return randomNumbers
}

const sliderWrapper = document.getElementsByClassName('slider__wrapper')[0];
const sliderControl = document.getElementsByClassName('slider__control');

sliderWrapper.innerHTML = renderPets().join('');
let arrButtons = document.getElementsByClassName('card__link');
addEventListenerButtonCard(arrButtons);


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


burgerButton.addEventListener('click', () => {
    if (burgerMenuFlag) {
        burgerMenu.style.display = 'flex';
        burgerMenuFlag = false;
        burgerButton.classList.add('burger--click');
        burgerButton.classList.remove('burger--prev-click');
        burgerButton.classList.remove('burger--prev-click');
        burgerMenu.classList.add('burger__menu--open');
        burgerMenu.classList.remove('burger__menu--close');
    } else {
        burgerMenuFlag = true;
        burgerButton.classList.add('burger--prev-click');
        burgerMenu.classList.add('burger__menu--close');
        burgerMenu.classList.add('burger__menu--close');
        burgerMenu.classList.remove('burger__menu--open');
        setTimeout(() => {
            burgerMenu.style.display = 'none'
        }, 3000)
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
                <div class="popup__img-wrapper">
                    <img src="${pet.img}" alt="${pet.name}" class="popup__img">
                </div>
        
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


//const width = screen.width;