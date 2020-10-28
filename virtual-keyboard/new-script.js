const keyButtons = [
    {
        'key': '`',
        'keyKode': '',
        display: {
            rus: 'ё',
            en: '`'
        },
        shift: {
            rus: 'Ё',
            en: '~'
        }
    },
    {
        'key': '1',
        'keyKode': '',
        display: {
            rus: '1',
            en: '1'
        },
        shift: {
            rus: '!',
            en: '!'
        }
    },
    {
        'key': '2',
        'keyKode': '',
        display: {
            rus: '2',
            en: '2'
        },
        shift: {
            rus: '"',
            en: '№'
        }
    },
    {
        'key': '3',
        'keyKode': '',
        display: {
            rus: '3',
            en: '3'
        },
        shift: {
            rus: '№',
            en: '№'
        }
    },
    {
        'key': '4',
        'keyKode': '',
        display: {
            rus: '4',
            en: '4'
        },
        shift: {
            rus: ';',
            en: ';'
        }
    },
    {
        'key': '5',
        'keyKode': '',

        display: {
            rus: '5',
            en: '5'
        },
        shift: {
            rus: ';',
            en: ';'
        }
    },
    {
        'key': '6',
        'keyKode': '',

        display: {
            rus: '6',
            en: '6'
        },
        shift: {
            rus: ';',
            en: ';'
        }
    },
    {
        'key': '7',
        'keyKode': '',

        display: {
            rus: '7',
            en: '7'
        },
        shift: {
            rus: ';',
            en: ';'
        }
    },
    {
        'key': '8',
        'keyKode': '',
        display: {
            rus: '8',
            en: '8'
        },
        shift: {
            rus: ';',
            en: ';'
        }
    },
    {
        'key': '9',
        'keyKode': '',
        display: {
            rus: '9',
            en: '9'
        },
        shift: {
            rus: '(',
            en: '('
        }
    },
    {
        'key': '0',
        'keyKode': '',
        display: {
            rus: '0',
            en: '0'
        },
        shift: {
            rus: ')',
            en: '('
        }
    },
    {
        'key': '-',
        'keyKode': '',
        display: {
            rus: '-',
            en: '-'
        },
        shift: {
            rus: '_',
            en: '_'
        }
    },
    {
        'key': 'backspace',
        'keyKode': '',
        meta: true,
        display: {
            rus: 'backspace',
            en: 'backspace'
        },
        shift: {
            rus: 'backspace',
            en: 'backspace'
        }
    },
    {
        'key': 'tab',
        'keyKode': '',
        meta: true,
        display: {
            rus: 'tab',
            en: 'tab'
        },
        shift: {
            rus: 'tab',
            en: 'tab'
        }
    },
    {
        'key': 'q',
        'keyKode': '',
        display: {
            rus: 'й',
            en: 'q'
        },
        shift: {
            rus: 'Й',
            en: 'Q'
        }
    },
    {
        'key': 'w',
        'keyKode': '',
        display: {
            rus: 'ц',
            en: 'w'
        },
        shift: {
            rus: 'Ц',
            en: 'W'
        }
    },
    {
        'key': 'e',
        'keyKode': '',
        display: {
            rus: 'у',
            en: 'e'
        },
        shift: {
            rus: 'У',
            en: 'E'
        }
    },
    {
        'key': 'r',
        'keyKode': '',
        display: {
            rus: 'к',
            en: 'r'
        },
        shift: {
            rus: 'К',
            en: 'R'
        }
    },
    {
        'key': 't',
        'keyKode': '',
        display: {
            rus: 'е',
            en: 't'
        },
        shift: {
            rus: 'Е',
            en: 'T'
        }
    },
    {
        'key': 'y',
        'keyKode': '',
        display: {
            rus: 'н',
            en: 'y'
        },
        shift: {
            rus: 'Н',
            en: 'Y'
        }
    },
    {
        'key': 'u',
        'keyKode': '',
        display: {
            rus: 'г',
            en: 'u'
        },
        shift: {
            rus: 'Г',
            en: 'U'
        }
    },
    {
        'key': 'i',
        'keyKode': '',
        display: {
            rus: 'ш',
            en: 'i'
        },
        shift: {
            rus: 'Ш',
            en: 'I'
        }
    },
    {
        'key': 'o',
        'keyKode': '',
        display: {
            rus: 'щ',
            en: 'o'
        },
        shift: {
            rus: 'Щ',
            en: 'O'
        }
    },
    {
        'key': 'p',
        'keyKode': '',
        display: {
            rus: 'з',
            en: 'p'
        },
        shift: {
            rus: 'З',
            en: 'P'
        }
    },
    {
        'key': '[',
        'keyKode': '',
        display: {
            rus: 'х',
            en: '['
        },
        shift: {
            rus: 'Х',
            en: '{'
        }
    },
    {
        'key': ']',
        'keyKode': '',
        display: {
            rus: 'щ',
            en: 'o'
        },
        shift: {
            rus: 'Щ',
            en: 'O'
        }
    },
    {
        'key': 'en/ru',
        'keyKode': '',
        meta: true,
        display: {
            rus: 'en/ru',
            en: 'en/ru'
        },
        shift: {
            rus: 'en/ru',
            en: 'en/ru'
        }
    },
]

let keyboardHtml = document.getElementsByClassName('root');

class Keyboard {
    constructor(keyButtons) {
        this.keyButtons = keyButtons;
        this.isAlphabet = 'en';
        this.rootHtmlButton = document.getElementsByClassName('keyboardItem');
        this.textarea = document.querySelector('.use-keyboard-input');
    }

    createKeyButton() {
        return this.keyButtons.map(keyItem => {
            let className = 'keyboardItem '
            if (keyItem.meta) {
                className += 'bigButton'
            }
            if (this.isAlphabet === 'en') {

                return this.htmlCreateButton(keyItem.key, className)
            } else if (this.isAlphabet === 'rus') {

                return this.htmlCreateButton(keyItem.display.rus, className)
            }
        })
    }

    buttonDown(e, type) {
        if (type === 'keyboard') {
            const keyboardItem = document.querySelectorAll('.keyboardItem');
            [].forEach.call(keyboardItem, item => {
                if (item.dataset.key === e) {
                    item.classList.add('keyboardItem-hover')
                }
            })
        } else {
            e.target.classList.add('keyboardItem-hover');
        }

    }

    buttonUp(e, type) {
        if (type === 'keyboard') {
            const keyboardItem = document.querySelectorAll('.keyboardItem');
            [].forEach.call(keyboardItem, item => {
                if (item.dataset.key === e) {
                    item.classList.remove('keyboardItem-hover')
                }
            })
        } else {
            e.target.classList.remove('keyboardItem-hover');
        }
    }

    changeLanguage() {
        if (this.isAlphabet === 'en') {
            this.isAlphabet = 'rus';
        } else {
            this.isAlphabet = 'en';
        }
        this.renderHtml();
        const changeLanguageButton = document.querySelector('[data-key="en/ru"]');
        changeLanguageButton.addEventListener('click', () => {
            this.changeLanguage();
        });
    }

    renderHtml() {
        let createKeyboard = this.createKeyButton();
        keyboardHtml[0].innerHTML = createKeyboard.join('');
        this.addEvent()
    }

    addEvent() {
        [].forEach.call(this.rootHtmlButton, item => {
            item.addEventListener("mouseup", (e) => {
                keyBoard.buttonUp(e);
                this.renderTextareaInput(e)
            })
            item.addEventListener("mousedown", (e) => {
                keyBoard.buttonDown(e)
            })
            if(item.dataset.key === 'backspace') {
                console.log(item)
                item.addEventListener('click', () => {
                    this.backspaceButton()
                })
            }
        });
    }

    backspaceButton() {
        this.textarea.innerHTML = this.textarea.innerHTML.slice(0, -1);
    }

    renderTextareaInput(e) {

        let keyObj = {};
        if(this.isAlphabet === 'rus') {
            keyObj = this.keyButtons.filter(item => {
                return item.display.rus === e.target.dataset.key
            });
        } else {
            keyObj = this.keyButtons.filter(item =>  item.key === e.target.innerHTML);
        }
        if (keyObj[0].meta === undefined) {
            this.textarea.innerHTML += e.target.innerHTML
        }
    }

    htmlCreateButton(button, classText) {
        return `<div data-key="${button}" class="${classText}">${button}</div>`
    }

    upperCaseBtn() {

    }
}

let keyBoard = new Keyboard(keyButtons);
let createKeyboard = keyBoard.createKeyButton();
keyboardHtml[0].innerHTML = createKeyboard.join('');

keyBoard.addEvent();
window.addEventListener("keydown", (e) => {
    keyBoard.buttonDown(e.key, 'keyboard')
})
window.addEventListener("keyup", (e) => {
    keyBoard.buttonUp(e.key, 'keyboard')
});

const changeLanguageButton = document.querySelector('[data-key="en/ru"]');
changeLanguageButton.addEventListener('click', (e) => {
    keyBoard.changeLanguage();
});



















// let rootHtmlButton = document.getElementsByClassName('keyboardItem');
// const changeLanguageButton = document.querySelector('[data-key="en/ru"]');
// changeLanguageButton.addEventListener('mouseup', (e) => {
//     keyBoard.changeLanguage(e);
// });

// [].forEach.call(rootHtmlButton, item => {
//     item.addEventListener("mouseup", (e) => {
//         keyBoard.buttonUp(e)
//     })
//     item.addEventListener("mousedown", (e) => {
//         keyBoard.buttonDown(e)
//     })
// });

// window.addEventListener("keydown", (e) => {
//     keyBoard.buttonDown(e.key, 'keyboard')
// })
// window.addEventListener("keyup", (e) => {
//     keyBoard.buttonUp(e.key, 'keyboard')
// });


// const topRowKeyboard = ["`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=","backspace"];
// const bottomRowKeyboard = [ "ctrl", "win", "alt", "space", "alt", "left", "down", "right", "ctrl"];
//
// let engAlphabet = [
//     "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "/\//", "del",
//     "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
//     "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift",
// ];
//
// let rusAlphabet = [
//     "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/\//", "Del",
//     "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
//     "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift",
// ];
// let numSymbol = {
//     '`':'~',
//     '[': '{',
//     ']': '}',
//     ';': ':',
//     "'": '"',
//     ',': '<',
//     '.': '>',
//     0: ')',
//     1: '!',
//     2: '@',
//     3: '#',
//     4: '$',
//     5: '%',
//     6: '^',
//     7: '&',
//     8: '*',
//     9: '(',
//     '-': '_',
//     '=': '+'
// }
//
// const serviceButton = ["backspace", "tab", "del","caps","enter", "shift", "ctrl", "win", "space", "alt", "left", "down", "right"]
//
// function createKeyButton(alphabet) {
//     let keySymbols = [...topRowKeyboard, ...alphabet, ...bottomRowKeyboard];
//     return keySymbols.map(item => {
//         let classNameButton = '';
//         if(serviceButton.includes(item)) {
//             classNameButton = item + " bigButton"
//         }
//         return `<div data-key="${item}" class="keyboardItem ${classNameButton}">${item}</div>`
//     })
// }
// let keyButtons = createKeyButton(engAlphabet);
//
// let keyboardHtml = document.getElementsByClassName('root');
// keyboardHtml[0].innerHTML = keyButtons.join('');
//
// let rootHtmlButton = document.getElementsByClassName('keyboardItem');
// [].forEach.call(rootHtmlButton,item => {
//     item.addEventListener( "click" , (e) => {
//         e.target.classList.add('keyboardItem-hover')
//     })
// })
