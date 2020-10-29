let keyboardHtml = document.getElementsByClassName('root');
const audioButtonEng = document.querySelector('audio[data-audio="engButton"]');
const audioButtonRus = document.querySelector('audio[data-audio="rusButton"]');
const audioButtonBackspace = document.querySelector('audio[data-audio="backspace"]');
const audioButtonEnter = document.querySelector('audio[data-audio="enter"]');
const audioButtonShift = document.querySelector('audio[data-audio="shift"]');
const audioButtonCaps = document.querySelector('audio[data-audio="caps"]');

class Keyboard {
    constructor(keyButtons) {
        this.keyButtons = keyButtons;
        this.isAlphabet = 'en';
        this.rootHtmlButton = document.getElementsByClassName('keyboardItem');
        this.textarea = document.querySelector('.use-keyboard-input');
        this.textarea.focus();
        this.textarea.addEventListener('blur', () => {
            this.textarea.focus();
        })
        this.caps = false;
        let createKeyboard = this.createKeyButton();
        keyboardHtml[0].innerHTML = createKeyboard.join('');
        this.addEvent();
        this.windowEvent();
        this.isSound = true;
        this.isShift = false;
    }

    createKeyButton() {
        return this.keyButtons.map(keyItem => {
            let className = 'keyboardItem '
            if (keyItem.meta) {
                className += 'bigButton'
            }
            if (this.caps && keyItem.key === 'caps') className += ' keyboardItem-pressed';
            if (this.isShift && keyItem.key === 'shift') className += ' keyboardItem-pressed';

            if (this.isAlphabet === 'en') {
                if (this.caps && keyItem.meta === undefined) {
                    return this.htmlCreateButton(keyItem.key, keyItem.key.toUpperCase(), className);
                } else if (this.isShift && keyItem.meta === undefined) {
                    return this.htmlCreateButton(keyItem.key, keyItem.shift.en, className);
                } else {
                    return this.htmlCreateButton(keyItem.key, keyItem.display.en, className);
                }

            } else if (this.isAlphabet === 'rus') {
                if (this.caps && keyItem.meta === undefined) {
                    return this.htmlCreateButton(keyItem.key, keyItem.display.rus.toUpperCase(), className);
                } else if (this.isShift && keyItem.meta === undefined) {
                    if(this.caps) return
                    return this.htmlCreateButton(keyItem.key, keyItem.shift.rus, className);
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
            let caretPos;
            item.addEventListener("mouseup", (e) => {

                switch (true) {

                    case (item.dataset.key === 'backspace') :
                        this.backspaceButton()
                        break;

                    case (item.dataset.key === 'en/ru') :
                        this.changeLanguage();
                        break;
                    case (item.dataset.key === 'sound') :
                        this.isSound = !this.isSound;
                        break;
                    case (item.dataset.key === 'arrow') :

                        if(item.innerHTML === '←') {
                            caretPos =  this.textarea.selectionStart - 1;
                        } else if(item.innerHTML === '→') {
                            caretPos = this.textarea.selectionStart + 1;
                        }
                        this.textarea.setSelectionRange(caretPos, caretPos);
                        break;

                }
                this.buttonUp(e);
                this.audioPlay(item);
                this.renderTextareaInput(e);
            })
            item.addEventListener("click", (e) => {
                if (item.dataset.key === 'caps') {
                    this.capsButton(item)
                } else if (item.dataset.key === 'shift') {
                    this.shiftButton(e);
                } else if (item.dataset.key === 'del') {
                    console.log()
                    this.deleteButton(caretPos)
                }
            });

            item.addEventListener("mousedown", (e) => {
                this.buttonDown(e)
            });
        });
    }
    audioPlay(item) {
        if (!this.isSound) return;
        switch (true) {
            case (item.dataset.key === 'enter'):
                audioButtonEnter.play();
                break;
            case (item.dataset.key === 'caps'):
                audioButtonCaps.play();
                break;
            case (item.dataset.key === 'shift'):
                audioButtonShift.play();
                break;
            case (item.dataset.key === 'backspace'):
                audioButtonBackspace.play();
                break;
            case (this.isAlphabet === 'rus'):
                audioButtonEng.play();
                break;
            case (this.isAlphabet === 'en'):
                audioButtonRus.play();
                break;
        }
    }

    shiftButton() {
        this.isShift = !this.isShift;
        this.renderHtml();
    }

    capsButton() {
        this.caps = !this.caps;
        this.renderHtml();
    }

    deleteButton() {
        let caretPos = this.textarea.selectionStart;
        this.textarea.value = this.textarea.value.substring(0, caretPos) + this.textarea.value.substring(caretPos + 1, this.textarea.value.length);
        this.textarea.selectionStart = caretPos;
        this.textarea.selectionEnd = caretPos ;
    }

    backspaceButton() {
        let caretPos = this.textarea.selectionStart;
        this.textarea.value = this.textarea.value.substring(0, caretPos -1) + this.textarea.value.substring(caretPos, this.textarea.value.length);
        this.textarea.selectionStart = caretPos - 1;
        this.textarea.selectionEnd = caretPos - 1 ;
    }

    renderTextareaInput(e) {
        let keyObj = {};
        if (this.isAlphabet === 'rus') {
            keyObj = this.keyButtons.filter(item => {
                return item.key === e.target.dataset.key;
            });
        } else {

            keyObj = this.keyButtons.filter(item => item.key === e.target.dataset.key);
        }
        if (keyObj[0].meta === undefined) {
            let caretPos = this.textarea.selectionStart;
            this.textarea.value = this.textarea.value.substring(0, caretPos) + e.target.innerHTML + this.textarea.value.substring(caretPos , this.textarea.value.length);
            this.textarea.selectionEnd = caretPos +1;
        }
    }

    htmlCreateButton(keyButton, button, classText) {
        return `<div data-key="${keyButton}" class="${classText}">${button}</div>`
    }

    cursorGetPosition(e) {
        console.log(this.textarea.selectionStart)
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


// function setCaretPosition(elemId, caretPos) {
//     var elem = document.getElementById(elemId);
//
//     if(elem != null) {
//         if(elem.createTextRange) {
//             var range = elem.createTextRange();
//             range.move('character', caretPos);
//             range.select();
//         }
//         else {
//             if(elem.selectionStart) {
//                 elem.focus();
//                 elem.setSelectionRange(caretPos, caretPos);
//             }
//             else
//                 elem.focus();
//         }
//     }
// }


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
