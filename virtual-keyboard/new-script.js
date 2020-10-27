let engAlphabet = [
    "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=","backspace",
    "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "/\//", "Del",
    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
    "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift",
    "ctrl", "win", "alt", "space", "alt", "left", "down", "right", "ctrl"
];

let rusAlphabet = [
    "ё","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=","backspace",
    "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/\//", "Del",
    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
    "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift",
    "ctrl", "win", "alt", "space", "alt", "left", "down", "right", "ctrl"
];
let numSymbol = {
    '`':'~',
    '[': '{',
    ']': '}',
    ';': ':',
    "'": '"',
    ',': '<',
    '.': '>',
    0: ')',
    1: '!',
    2: '@',
    3: '#',
    4: '$',
    5: '%',
    6: '^',
    7: '&',
    8: '*',
    9: '(',
    '-': '_',
    '=': '+'
}
let keyButtons = engAlphabet.map(item => {
    return `<div class="keyboardItem">${item}</div>`
})

let keyboardHtml = document.getElementsByClassName('root')[0];
keyboardHtml.innerHTML = keyButtons.join('');