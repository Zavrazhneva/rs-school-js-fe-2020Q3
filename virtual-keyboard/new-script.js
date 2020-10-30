let keyboardHtml = document.getElementsByClassName('root');
const audioButtonEng = document.querySelector('audio[data-audio="engButton"]');
const audioButtonRus = document.querySelector('audio[data-audio="rusButton"]');
const audioButtonBackspace = document.querySelector('audio[data-audio="backspace"]');
const audioButtonEnter = document.querySelector('audio[data-audio="enter"]');
const audioButtonShift = document.querySelector('audio[data-audio="shift"]');
const audioButtonCaps = document.querySelector('audio[data-audio="caps"]');
const audioButtonSound = document.querySelector('audio[data-audio="sound"]');

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
        this.voice = false;
    }

    createKeyButton() {
        return this.keyButtons.map(keyItem => {
            let className = 'keyboardItem '
            if (keyItem.meta) {
                className += 'bigButton'
            }
            if (this.caps && keyItem.key === 'caps') className += ' keyboardItem-pressed';
            if (this.isShift && keyItem.key === 'shift') className += ' keyboardItem-pressed';
            if (this.isSound === false && keyItem.key === 'sound') className += ' keyboardItem-pressed';
            if (keyItem.key === 'space') className += ' space';
            if (keyItem.key === 'shift') className += ' shift';
            if (keyItem.key === 'voice' && this.voice === true) className += ' keyboardItem-pressed';


            if (this.isAlphabet === 'en') {
                if (this.caps && keyItem.meta === undefined && this.isShift !==true) {
                    return this.htmlCreateButton(keyItem.key, keyItem.key.toUpperCase(), className);
                } else if (this.isShift && keyItem.meta === undefined && this.caps !== true) {
                    return this.htmlCreateButton(keyItem.key, keyItem.shift.en, className);
                } else {
                    if(this.caps && this.isShift) {
                        return this.htmlCreateButton(keyItem.key, keyItem.shift.en.toLowerCase(), className)
                    } else {
                        return this.htmlCreateButton(keyItem.key, keyItem.display.en, className);
                    }
                }

            } else if (this.isAlphabet === 'rus') {
                if (this.caps && keyItem.meta === undefined && this.isShift !==true) {
                    return this.htmlCreateButton(keyItem.key, keyItem.display.rus.toUpperCase(), className);
                } else if (this.isShift && keyItem.meta === undefined && this.caps !== true) {
                    return this.htmlCreateButton(keyItem.key, keyItem.shift.rus, className);
                } else {
                    if(this.caps && this.isShift) {
                        return this.htmlCreateButton(keyItem.key, keyItem.shift.rus.toLowerCase(), className)
                    }else {
                        return this.htmlCreateButton(keyItem.key, keyItem.display.rus, className)
                    }
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
                this.audioPlay(item);
                switch (true) {

                    case (item.dataset.key === 'backspace') :
                        this.backspaceButton()
                        break;

                    case (item.dataset.key === 'en/ru') :
                        this.changeLanguage();
                        break;

                    case (item.dataset.key === 'arrow') :

                        if (item.innerHTML === '◄') {
                            caretPos = this.textarea.selectionStart - 1;
                        } else if (item.innerHTML === '►') {
                            caretPos = this.textarea.selectionStart + 1;
                        }
                        this.textarea.setSelectionRange(caretPos, caretPos);
                        break;

                }
                this.buttonUp(e);

                this.renderTextareaInput(e);
            })
            item.addEventListener("click", (e) => {
                if (item.dataset.key === 'caps') {
                    this.capsButton(item)
                } else if (item.dataset.key === 'shift') {
                    this.shiftButton(e);
                } else if (item.dataset.key === 'del') {
                    this.deleteButton(caretPos)
                } else if (item.dataset.key === 'sound' ) {
                    this.isSound = !this.isSound;
                    this.renderHtml();
                } else if (item.dataset.key === 'voice' ) {
                    this.voice = !this.voice;
                    this.recordingWord()
                    this.renderHtml();
                }
            });
            item.addEventListener("click", (e) => {
                this.buttonDown(e)
            });

        });
    }

    audioPlay(item) {
        if (!this.isSound) return;
        switch (true) {
            case (item.dataset.key === 'enter ↵'):
                audioButtonEnter.play();
                break;
            case (item.dataset.key === 'sound'):
                audioButtonSound.play();
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
        this.textarea.selectionEnd = caretPos;
    }

    backspaceButton() {
        let caretPos = this.textarea.selectionStart;
        this.textarea.value = this.textarea.value.substring(0, caretPos - 1) + this.textarea.value.substring(caretPos, this.textarea.value.length);
        this.textarea.selectionStart = caretPos - 1;
        this.textarea.selectionEnd = caretPos - 1;
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
        let caretPos = this.textarea.selectionStart;
        if (keyObj[0].key === 'enter ↵') {
            this.textarea.value = this.textarea.value.substring(0, caretPos) + '\n' + this.textarea.value.substring(caretPos, this.textarea.value.length);
            this.textarea.selectionEnd = caretPos + 1;
        }
        if (keyObj[0].key === 'space') {
            this.textarea.value = this.textarea.value.substring(0, caretPos) + ' ' + this.textarea.value.substring(caretPos, this.textarea.value.length);

            this.textarea.selectionEnd = caretPos + 1;
        }
        if (keyObj[0].key === 'tab') {
            this.textarea.value = this.textarea.value.substring(0, caretPos) + '    ' + this.textarea.value.substring(caretPos, this.textarea.value.length);
            caretPos += 3;
            this.textarea.selectionEnd = caretPos + 1;
        }

        if (keyObj[0].meta === undefined) {
            this.textarea.value = this.textarea.value.substring(0, caretPos) + e.target.innerHTML + this.textarea.value.substring(caretPos, this.textarea.value.length);
            this.textarea.selectionEnd = caretPos + 1;
        }
    }

    recordingWord() {
        if(this.voice === false ) return;
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        let textarea = document.querySelector('.use-keyboard-input');
        recognition.interimResults = true;
        recognition.lang = 'ru-RU';

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');

            if (e.results[0].isFinal) {
                textarea.textContent +=' ' + poopScript;
            }
        });

        recognition.addEventListener('end', recognition.start);
        recognition.start();
    }

    htmlCreateButton(keyButton, button, classText) {
        if(button === 'en/ru') button += ` (${this.isAlphabet})`;
        if(button === 'voice')  return `
        <div data-key="${keyButton}" class="${classText} material-icons">keyboard_voice</div>
        `
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


