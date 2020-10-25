let pets = []; // 8
let fullPetsList = []; // 48
let currentPage = 1;
const cardWrapperElement = document.querySelector(".card__wrapper");
const currentPageElement = document.querySelector("#currentPage");
const firstPageButton = document.querySelector("#firstPage");
const lastPageButton = document.querySelector("#lastPage");
const prevPageButton = document.querySelector("#prevPage");
const nextPageButton = document.querySelector("#nextPage");
const viewPort = document.querySelector('.root');
const cardHeight = 435;
const cardMargin = 25;
let pageCount = getPageCount();



const createPets = (petsList) => {
    cardWrapperElement.innerHTML += createElements(petsList);
}
const createElements = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
        str += `<article class="card">
                    <img src="${petsList[i].img}" alt="${petsList[i].name}" class="slide__img">
                    <div class="card-descript__wrapper">
                        <h4 class="card__title">${petsList[i].name}</h4>
                        <a data-id="${petsList[i].name}" class="card__link button button--transparent">Learn more</a>
                    </div>
                </article>`;
    }
    return str;
}
const sort863 = (list) => {
    let unique8List = [];
    let length = list.length;
    for (let i = 0; i < length / 8; i++) {
        const uniqueStepList = [];
        for (let j = 0; j < list.length; j++) {
            if (uniqueStepList.length >= 8) {
                break;
            }
            const isUnique = !uniqueStepList.some((item) => {
                return item.name === list[j].name;
            });
            if (isUnique) {
                uniqueStepList.push(list[j]);
                list.splice(j, 1);
                j--;
            }
        }
        unique8List = [...unique8List, ...uniqueStepList];
    }
    list = unique8List;
    list = sort6recursively(list);
    return list;
}
const sort6recursively = (list) => {
    const length = list.length;

    for (let i = 0; i < (length / 6); i++) {
        const stepList = list.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const which8OfList = Math.trunc(ind / 8);

                list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

                sort6recursively(list);
            }
        }
    }

    return list;
}

fetch('../../pets.json').then(res => res.json()).then(list => {
    pets = list;
    fullPetsList = (() => {
        let tempArr = [];
        for (let i = 0; i < 6; i++) {
            const newPets = pets;

            for (let j = pets.length; j > 0; j--) {
                let randInd = Math.floor(Math.random() * j);
                const randElem = newPets.splice(randInd, 1)[0];
                newPets.push(randElem);
            }

            tempArr = [...tempArr, ...newPets];
        }
        return tempArr;
    })();
    fullPetsList = sort863(fullPetsList);
    createPets(fullPetsList);
    currentPageElement.innerText = currentPage;
    for (let i = 0; i < (fullPetsList.length / 6); i++) {
        const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);
        for (let j = 0; j < 6; j++) {
            stepList.forEach((item, ind) => {
                if (item.name === stepList[j].name && (ind !== j)) {
                    cardWrapperElement.children[(i * 6) + j].style.border = '5px solid red';
                }
            })
        }
    }
    resizeViewPort(48 / pageCount);
    setActiveButtons();
})


function onResize() {
    currentPage = 1;
    setActiveButtons();
    pageCount = getPageCount();
    resizeViewPort(fullPetsList.length / pageCount);
    setScroll();
}

function getPageCount() {
    if (window.innerWidth >= 1280 ) {
        return 6
    } else if (window.innerWidth >= 768 ) {
        return 8;
    } else {
        return 16;
    }
}


function resizeViewPort(elementsToShow) {
    let rows = 2;
    if (elementsToShow === 6 || elementsToShow === 3) {
        rows = 3;
    }
    viewPort.style.height = `${(cardHeight + cardMargin) * rows}px`
}


function getScrollOffset () {
    let multiply = pageCount === 6 ? 2 : 3;
    return ((cardHeight + cardMargin) * multiply) * (currentPage - 1)
}



function setActiveButtons() {
    const isLastPage = currentPage === pageCount;
    const isFirstPage = currentPage === 1;

    if (isLastPage) {
        nextPageButton.setAttribute('disabled', 'true');
        lastPageButton.setAttribute('disabled', 'true');
    } else {
        nextPageButton.removeAttribute('disabled');
        lastPageButton.removeAttribute('disabled');
    }

    if (isFirstPage) {
        prevPageButton.setAttribute('disabled', 'true');
        firstPageButton.setAttribute('disabled', 'true');
    } else {
        prevPageButton.removeAttribute('disabled');
        firstPageButton.removeAttribute('disabled');
    }}


function setScroll() {
    cardWrapperElement.style.top = `-${getScrollOffset()}px`;
    currentPageElement.innerText = currentPage;
}


prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        setActiveButtons();
        setScroll();
    }

});
nextPageButton.addEventListener('click', () => {
    if (currentPage < pageCount) {
        currentPage++;
        setActiveButtons();
        setScroll();
    }
});

firstPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage = 1;
        setActiveButtons();
        setScroll();
    }
});

lastPageButton.addEventListener('click', () => {
    if (currentPage < pageCount) {
        currentPage = pageCount;
        setActiveButtons();
        setScroll();
    }
});

window.addEventListener('resize', onResize);