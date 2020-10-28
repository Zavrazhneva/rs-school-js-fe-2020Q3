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
    constructor(alphabet) {
        this.alphabet = alphabet;
        this.isAlphabet = 'en';
    }

    createKeyButton() {
        return this.alphabet.map(keyItem => {
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
        this.addEvent()
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
        this.addEvent()
    }

    changeLanguage() {
        if (this.isAlphabet === 'en') {
            this.isAlphabet = 'rus';
        } else {
            this.isAlphabet = 'en';
        }
        this.renderHtml();
        const changeLanguageButton = document.querySelector('[data-key="en/ru"]');
        changeLanguageButton.addEventListener('mouseup', () => {
            keyBoard.changeLanguage();
        });
    }

    renderHtml() {
        let createKeyboard = this.createKeyButton();
        keyboardHtml[0].innerHTML = createKeyboard.join('');
    }

    addEvent() {
        let rootHtmlButton = document.getElementsByClassName('keyboardItem');
        const changeLanguageButton = document.querySelector('[data-key="en/ru"]');
        changeLanguageButton.addEventListener('mouseup', (e) => {
            keyBoard.changeLanguage(e);
        });
        window.addEventListener("keydown", (e) => {
            keyBoard.buttonDown(e.key, 'keyboard')
        })
        window.addEventListener("keyup", (e) => {
            keyBoard.buttonUp(e.key, 'keyboard')
        });
        [].forEach.call(rootHtmlButton, item => {
            item.addEventListener("mouseup", (e) => {
                keyBoard.buttonUp(e)
            })
            item.addEventListener("mousedown", (e) => {
                keyBoard.buttonDown(e)
            })
        });
    }

    renderTextareaInput() {

    }

    htmlCreateButton(button, classText) {
        return `<div data-key="${button}" class="${classText}">${button}</div>`
    }
}

let keyBoard = new Keyboard(keyButtons);
let createKeyboard = keyBoard.createKeyButton();
keyboardHtml[0].innerHTML = createKeyboard.join('');

keyBoard.addEvent()
