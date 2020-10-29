

let keyboardHtml = document.getElementsByClassName('root');

class Keyboard {
    constructor(keyButtons) {
        this.keyButtons = keyButtons;
        this.isAlphabet = 'en';
        this.rootHtmlButton = document.getElementsByClassName('keyboardItem');
        this.textarea = document.querySelector('.use-keyboard-input');
        this.caps = false;
        let createKeyboard = this.createKeyButton();
        keyboardHtml[0].innerHTML = createKeyboard.join('');
        this.addEvent();
        this.windowEvent();
    }

    createKeyButton() {
        return this.keyButtons.map(keyItem => {
            let className = 'keyboardItem '
            if (keyItem.meta) {
                className += 'bigButton'
            }
            if (this.isAlphabet === 'en') {
                if(this.caps && keyItem.meta === undefined) {
                    return this.htmlCreateButton(keyItem.key, keyItem.key.toUpperCase(), className);
                } else {
                    return this.htmlCreateButton(keyItem.key, keyItem.display.en, className);
                }

            } else if (this.isAlphabet === 'rus') {
                if(this.caps && keyItem.meta === undefined) {
                    return this.htmlCreateButton(keyItem.key, keyItem.key.toUpperCase(), className);
                } else {
                    return this.htmlCreateButton(keyItem.key, keyItem.display.rus, className)
                }
            }
        })
    }

    buttonDown(e, type) {
        if (type === 'keyboard') {
            const keyboardItem = document.querySelectorAll('.keyboardItem');
            [].forEach.call(keyboardItem, item => {
                if (item.dataset.key === e) {
                    item.classList.add('keyboardItem-hover');
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
    }

    renderHtml() {
        let createKeyboard = this.createKeyButton();

            keyboardHtml[0].innerHTML = createKeyboard.join('');

        this.addEvent()
    }

    addEvent() {

        [].forEach.call(this.rootHtmlButton, item => {
            item.addEventListener("mouseup", (e) => {
                this.buttonUp(e);
                this.audioPlay();
                this.renderTextareaInput(e);
            })
            item.addEventListener("mousedown", (e) => {
                this.buttonDown(e)
            })
            if (item.dataset.key === 'backspace') {
                item.addEventListener('click', () => {
                    this.backspaceButton()
                })
            }
            if (item.dataset.key === 'caps') {
                item.addEventListener('click', () => {
                    this.capsButton(item);
                })
            }
        });

        const changeLanguageButton = document.querySelector('[data-key="en/ru"]');
        changeLanguageButton.addEventListener('click', (e) => {
            this.changeLanguage();
        });
    }

    audioPlay() {
        const audioButtonEng = document.querySelector('audio[data-audio="engButton"]');
        const audioButtonRus = document.querySelector('audio[data-audio="rusButton"]');
        if (this.isAlphabet === 'rus') {
            audioButtonEng.play();
        } else if (this.isAlphabet === 'en') {
            audioButtonRus.play()
        }
    }

    capsButton(button) {
        this.caps = !this.caps;
        if (this.caps) {
            button.style.background ='blue';
        } else {
            button.classList.remove('keyboardItem-pressed');
        }
        this.renderHtml();
    }

    deleteButton() {
        this.textarea.value = this.textarea.value.slice(-1, 0);
    }

    backspaceButton() {
        this.textarea.value = this.textarea.value.slice(0, -1);
    }

    renderTextareaInput(e) {
        let keyObj = [];
        if (this.isAlphabet === 'rus') {
            keyObj = this.keyButtons.filter(item => {
                return item.display.rus === e.target.dataset.key
            });
        } else {
            keyObj = this.keyButtons.filter(item => item.key === e.target.dataset.key);
        }
        if (keyObj[0].meta === undefined) {
            this.textarea.value += e.target.innerHTML;
            console.log(this.textarea.value)
        }
    }

    htmlCreateButton(keyButton,button, classText) {
        return `<div data-key="${keyButton}" class="${classText}">${button}</div>`
    }

    windowEvent() {
        window.addEventListener("keydown", (e) => {
            this.buttonDown(e.key, 'keyboard')
        })
        window.addEventListener("keyup", (e) => {
            this.buttonUp(e.key, 'keyboard')
        });
    }
}

let keyBoard = new Keyboard(keyButtons);


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
