function renderPet(pet) {
    return `<article class="card">
                <img src="${pet.img}" alt="${pet.name}" class="slide__img">
                <div class="card-descript__wrapper">
                    <h4 class="card__title">${pet.name}</h4>
                    <a href="#" data-id="${pet.name}" class="card__link button button--transparent">Learn more</a>
                </div>
              </article>`
}
function renderPets(randomNumbers) {
    let petsHtml = [];
    for(let i = 0 ; i < randomNumbers.length; i++) {
        petsHtml.push(renderPet(PETS[randomNumbers[i]]))
    }
    return petsHtml
}

function getRandomNumbers() {
    let randomNumbers = [];
    while(randomNumbers.length < 3 ) {
        let randomNumber = Math.floor(Math.random()*10)
        if(!randomNumbers.includes(randomNumber) && randomNumber < 8) {
            randomNumbers.push(randomNumber)
        }
    }
    return randomNumbers
}
let sliderWrapper = document.getElementsByClassName('slider__wrapper')[0];
const sliderControl = document.getElementsByClassName('slider__control');

sliderWrapper.innerHTML = renderPets([1,2,3]).join('');

[].forEach.call(sliderControl, (item) => {
    item.addEventListener('click', () => {
        sliderWrapper.innerHTML = renderPets(getRandomNumbers()).join('');
    })
});




