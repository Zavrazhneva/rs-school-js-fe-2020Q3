const sliderWrapper = document.getElementsByClassName('slider__wrapper')[0];
const sliderControl = document.getElementsByClassName('slider__control');
let arrButtons = document.getElementsByClassName('card__link');
let CardButtons = document.getElementsByClassName('card');



addEventListenerButtonCard(CardButtons);
sliderWrapper.innerHTML = renderPets( [4, 0, 2],3).join('');

 window.addEventListener('resize', () => {

     sliderWrapper.innerHTML =  renderPets(getRandomNumbers()).join('');
     arrButtons = document.getElementsByClassName('card__link');
     addEventListenerButtonCard(CardButtons)
});

function renderPet(pet) {
    return `<article data-id="${pet.name}" class="card">
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
    if(window.innerWidth < 768) {
        resizeCurrent = 1
    }
    let petsHtml = [];
    for (let i = 0; i < resizeCurrent; i++) {
        petsHtml.push(renderPet(PETS[randomNumbers[i]]))
    }
    return petsHtml
}

let prevRandomNumbers = [];
function getRandomNumbers() {
    let currentGenerateRandom = 3;
    if(window.innerWidth < 1280) {
        currentGenerateRandom = 2
    }
    if(window.innerWidth < 768) {
        currentGenerateRandom = 1
    }

    let randomNumbers = [];
    while (randomNumbers.length < currentGenerateRandom) {
        let randomNumber = Math.floor(Math.random() * 10);
        if (!randomNumbers.includes(randomNumber) && randomNumber < 8 ) {
            randomNumbers.push(randomNumber);
        }
    }

    if (prevRandomNumbers.length) {
        const hasSameNumber = randomNumbers.some( item => {
            return prevRandomNumbers.includes(item)
        });
        if (hasSameNumber) {
            return getRandomNumbers();
        }
    }
    prevRandomNumbers = randomNumbers;
    return randomNumbers
}

[].forEach.call(sliderControl, (item) => {
    item.addEventListener('click', () => {
        sliderWrapper.innerHTML = renderPets(getRandomNumbers()).join('');
        arrButtons = document.getElementsByClassName('card__link');
        addEventListenerButtonCard(CardButtons)
    })
});
sliderWrapper.innerHTML = renderPets(getRandomNumbers()).join('');
arrButtons = document.getElementsByClassName('card__link');
addEventListenerButtonCard(CardButtons);

let burgerMenuFlag = true;
const burgerButton = document.getElementsByClassName('burger')[0];
const burgerMenu = document.getElementsByClassName('burger__menu')[0];

const logo = document.getElementsByClassName('logo')[0];
const overlay = document.getElementsByClassName('overlay_active')[0];
overlay.addEventListener('click', () => {
    burgerClick();
})

burgerButton.addEventListener('click', () => {
    burgerClick();
});

function burgerClick () {
    if (burgerMenuFlag) {
        burgerMenu.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        overlay.style.display = 'block';
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
        overlay.style.display = 'none';
        burgerButton.classList.add('burger--prev-click');
        burgerMenu.classList.add('burger__menu--close');
        burgerMenu.classList.remove('burger__menu--open');
    }
}

function renderPopupPets(e) {
    let pet = e.currentTarget.getElementsByClassName('card__link')[0].dataset.id;
    let petName = pet;
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



function addEventListenerButtonCard(CardButtons) {



    [].forEach.call(CardButtons, item => {

        item.addEventListener('click', (e) => {
            document.body.classList.add('overflow');
            popup.innerHTML = renderHtmlPopupPets(renderPopupPets(e));
            popup.style.display = 'flex';
            const popupClose = document.getElementsByClassName('popup_close')[0];
            const popupBlock = document.getElementsByClassName('popup__block')[0];
            console.log(popupBlock)
            popupBlock.addEventListener('click', (e)=> {
                e.preventDefault();
            })
            popup.addEventListener('click', () => {
                popup.style.display = 'none';
                document.body.classList.remove('overflow');

                console.log(popupClose)
                popupClose.classList.add('popup__close-hover');


            });
            popupClose.addEventListener('click', () => {
                popup.style.display = 'none';
                document.body.classList.remove('overflow');
            });

        })
    });

}

