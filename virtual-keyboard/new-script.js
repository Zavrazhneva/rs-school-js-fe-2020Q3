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
        this.voiceRecording = false;

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

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
        this.onVoiceRecognized = this.onVoiceRecognized.bind(this);
    }

    setLanguage() {
        if (this.isAlphabet === 'en') {
            this.isAlphabet = 'rus';
            this.recognition.lang = 'ru-RU'
        } else {
            this.isAlphabet = 'en';
            this.recognition.lang = 'en-US';
        }

        if (this.voiceRecording) {
            this.recognition.stop();
        }
    }

    startRecognizing() {
        this.recognition.addEventListener('result', this.onVoiceRecognized);
        this.recognition.addEventListener('end', this.recognition.start);
        this.recognition.start();
        this.voiceRecording = true;
    }

    stopRecognizing() {
        this.recognition.removeEventListener('result', this.onVoiceRecognized);
        this.recognition.removeEventListener('end', this.recognition.start);
        this.recognition.stop();
        this.voiceRecording = false;
    }

    createKeyButton() {
        return this.keyButtons.map(keyItem => {
            let className = 'keyboardItem '
            if (keyItem.meta) {
                className += 'bigButton'
            }
            if (this.caps && keyItem.key === 'capslock') className += ' keyboardItem-pressed';
            if (this.isShift && keyItem.key === 'shift') className += ' keyboardItem-pressed';
            if (this.isSound === false && keyItem.key === 'sound') className += ' keyboardItem-pressed';
            if (keyItem.key === 'space') className += ' space';
            if (keyItem.key === 'shift') className += ' shift';
            if (keyItem.key === 'backspace') className += ' backspace';
            if (keyItem.key === 'voice' && this.voiceRecording) className += ' keyboardItem-pressed';
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
                if (item.dataset.key.toLowerCase() === e.key.toLowerCase()) {
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
                if (item.dataset.key.toLowerCase() === e.key.toLowerCase()) {
                    item.classList.remove('keyboardItem-hover')
                }
            })
        } else {
            e.target.classList.remove('keyboardItem-hover');
        }
    }

    changeLanguage() {
        this.setLanguage();
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
                if (item.dataset.key === 'capslock') {
                    this.capsButton()
                } else if (item.dataset.key === 'shift') {
                    this.shiftButton();
                } else if (item.dataset.key === 'delete') {
                    this.deleteButton()
                } else if (item.dataset.key === 'sound' ) {
                    this.isSound = !this.isSound;
                    this.renderHtml();
                } else if (item.dataset.key === 'voice') {
                    if (this.voiceRecording) {
                        this.stopRecognizing()
                    } else  {
                        this.startRecognizing();
                    }
                    this.renderHtml();
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
            case (item.dataset.key === 'Enter'):
                audioButtonEnter.play();
                break;
            case (item.dataset.key === 'sound'):
                audioButtonSound.play();
                break;
            case (item.dataset.key === 'capslock'):
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
        let keyObj = this.keyButtons.find(item => item.key === e.target.dataset.key);
        let caretPos = this.textarea.selectionStart;
        let caretPosEnd = this.textarea.selectionEnd;
        if (keyObj.key === 'Enter') {
            this.textarea.value = this.textarea.value.substring(0, caretPos) + '\n' + this.textarea.value.substring(caretPos, this.textarea.value.length);
            this.textarea.selectionEnd = caretPos + 1;
        }
        if (keyObj.key === 'space') {
            this.textarea.value = this.textarea.value.substring(0, caretPos) + ' ' + this.textarea.value.substring(caretPos, this.textarea.value.length);

            this.textarea.selectionEnd = caretPos + 1;
        }
        if (keyObj.key === 'tab') {
            this.textarea.value = this.textarea.value.substring(0, caretPos) + '    ' + this.textarea.value.substring(caretPos, this.textarea.value.length);
            caretPos += 3;
            this.textarea.selectionEnd = caretPos + 1;
        }

        //проверять во время вызыва backspace || delete
        // if( caretPos !== caretPosEnd ) {
        //     this.textarea.value = this.textarea.value.substring(0, this.textarea.selectionStart) + this.textarea.value.substring(this.textarea.selectionEnd);
        //     //this.textarea.selectionStart = caretPos+1;
        // }
        if (keyObj.meta === undefined) {
            const value = keyObj[this.isShift ? 'shift' : 'display'][this.isAlphabet];
            this.textarea.value = this.textarea.value.substring(0, caretPos) + (this.caps ? value.toUpperCase() : value) + this.textarea.value.substring(caretPos, this.textarea.value.length);
            this.textarea.selectionEnd = caretPos + 1;
        }
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
            [].forEach.call(this.rootHtmlButton, item => {
                if(item.dataset.key.toLowerCase() === e.key.toLowerCase()) {
                    this.audioPlay(item)
                }
            })
            if(e.key.toLowerCase() === 'capslock') {
                this.capsButton();
            }
            if(e.key === 'Shift') {
                this.shiftButton()
            }
            this.buttonDown(e, 'keyboard')
        })
        window.addEventListener("keyup", (e) => {
            this.buttonUp(e, 'keyboard')
        });
    }

    onVoiceRecognized(e) {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        if (e.results[0].isFinal) {
            this.textarea.value +=' ' + transcript;
        }
    }
}

new Keyboard(keyButtons);
