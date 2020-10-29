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
    {
        'key': 'del',
        'keyKode': '',
        meta: true,
        display: {
            rus: 'del',
            en: 'del'
        },
        shift: {
            rus: 'del',
            en: 'del'
        }
    },
    {
        'key': 'enter',
        'keyKode': '',
        meta: true,
        display: {
            rus: 'enter',
            en: 'enter'
        },
        shift: {
            rus: 'enter',
            en: 'enter'
        }
    },
    {
        'key': 'shift',
        'keyKode': '',
        meta: true,
        display: {
            rus: 'shift',
            en: 'shift'
        },
        shift: {
            rus: 'shift',
            en: 'shift'
        }
    },

    {
        'key': 'caps',
        'keyKode': '',
        meta: true,
        display: {
            rus: 'caps',
            en: 'caps'
        },
        shift: {
            rus: 'caps',
            en: 'caps'
        }
    },
]