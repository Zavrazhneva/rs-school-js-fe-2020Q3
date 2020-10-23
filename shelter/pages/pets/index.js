let pets = []; // 8
let fullPetsList = []; // 48
const request = new XMLHttpRequest();
request.open('GET', './pets.json');
request.onload = () => {};
fetch('./pets.json').then(res => res.json()).then(list => {
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

    document.querySelector("#currentPage").innerText = (currentPage+1).toString();

    for (let i = 0; i < (fullPetsList.length / 6); i++) {
        const stepList = fullPetsList.slice(i * 6, (i * 6) + 6);

        for (let j = 0; j < 6; j++) {
            stepList.forEach((item, ind) => {
                if ( item.name === stepList[j].name && (ind !== j) ) {
                    document.querySelector(".card__wrapper").children[(i * 6) + j].style.border = '5px solid red';
                }
            })
        }
    }
})


const createPets = (petsList) => {
    const elem = document.querySelector(".card__wrapper");
    elem.innerHTML += createElements(petsList);
}

createElements = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
        str += `<article class="card">
                    <img src="${ petsList[i].img }" alt="${petsList[i].name}" class="slide__img">
                    <div class="card-descript__wrapper">
                        <h4 class="card__title">${petsList[i].name}</h4>
                        <a data-id="${petsList[i].name}" class="card__link button button--transparent">Learn more</a>
                    </div>
                </article>`;
    }
    return str;
}


request.send();

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

let currentPage = 0;
document.querySelector("#prevPage").addEventListener('click', (e) => {
    if (currentPage > 0) {
        currentPage--;
        console.log(currentPage+1);
    }
    document.querySelector(".card__wrapper").style.top = `calc(35px - ${920 * currentPage}px)`;
    document.querySelector("#currentPage").innerText = (currentPage+1).toString();

});



document.querySelector("#nextPage").addEventListener('click', (e) => {
    if(currentPage === 5) return
    if (currentPage < (document.querySelector(".card__wrapper").offsetHeight / 920) - 1) {
        currentPage++;
        console.log(currentPage+1);
    }

    document.querySelector(".card__wrapper").style.top = `-${920 * currentPage}px`;
    document.querySelector("#currentPage").innerText = (currentPage+1).toString();
});

//(fullPetsList / itemsPerPage)
