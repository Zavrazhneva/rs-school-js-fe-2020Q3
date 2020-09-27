const buttons = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const previousHtml = document.querySelector('.previous-operand');
const currentHtml = document.querySelector('.current-operand');
const clearAll = document.querySelector('[data-all-clear]');
const squareButton = document.querySelector('[data-square]');
const minusButton = document.querySelector('[data-minus]');

class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = '';
        this.result = '';
        this.resultFlag = false;
    }
    appendNumber(number) {
        if (this.resultFlag) {
            this.currentOperand = '';
            this.appendInnerHtml();
            this.resultFlag = false
        }
        if (number === '.' && this.currentOperand === '') {
            return
        }
        if (number === '.' && this.currentOperand.includes('.')) {
            return
        }
        this.currentOperand += number.toString();
    }
    setPreviousValue() {
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    appendOperator(operator) {
        if (!this.currentOperand && !this.previousOperand) {
            return;
        }
        if (this.operator !== '' && this.currentOperand === '') {
            this.operator = operator;
            return;
        }
        if (this.operator !== '') {
            this.calculate();
            this.previousOperand = this.result.toString();
            this.currentOperand = '';
            this.appendInnerHtml();
            this.operator = operator;
        } else {
            this.operator = operator;
            this.setPreviousValue();
        }
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = '';
    }
    minus() {
        if (this.currentOperand) {
            this.currentOperand *= -1;
        } else {
            this.currentOperand += '-';
        }
    }
    calculate() {
        let current = parseFloat(this.currentOperand);
        let previous = parseFloat(this.previousOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operator) {
            case '+' :
                this.result = +(previous + current).toFixed(15);
                break;
            case '-' :
                this.result = +(previous - current).toFixed(15);
                break;
            case '×' :
                this.result = +(previous * current).toFixed(15);
                break;
            case '÷' :
                this.result = +(previous / current).toFixed(15);
                break;
            case 'xy' :
                this.result = Math.pow(this.previousOperand, this.currentOperand)
                break;
        }
        this.appendInnerHtml();
    }
    squareRoot() {
        if (this.currentOperand < 0 || this.currentOperand === '') {
            this.currentOperand = '';
            this.previousOperand = '';
            this.appendInnerHtml();
            currentHtml.innerText = "ERROR";
        } else {
            this.currentOperand = Math.sqrt(this.currentOperand).toString();
            this.calculate();
            this.appendInnerHtml();
            this.result = this.currentOperand;
        }
    }
    equalHandler() {
        if (!this.currentOperand && !this.previousOperand) {
            return
        }
        if (this.previousOperand === '' || this.operation) {
            this.currentOperand = '';
            this.previousOperand = '';
            this.appendInnerHtml();
            currentHtml.innerText = "ERROR";
            return
        }
        this.calculate();
        if(!isFinite(this.result)) {
            this.previousOperand = '';
            this.currentOperand = '';
            this.operator = '';
            this.appendInnerHtml();
            currentHtml.innerText = 'ERROR';
            return
        }
        this.currentOperand = this.result.toString();
        this.resultFlag = true;
        this.previousOperand = '';
        this.operator = '';
        this.appendInnerHtml();
    }
    appendInnerHtml() {
        previousHtml.innerText = this.previousOperand;
        currentHtml.innerText = this.currentOperand;
        if (this.operator !== '') {
            previousHtml.innerText = `${this.previousOperand} ${this.operator}`
        } else {
            this.previousOperand = ''
        }
    }
}
let calculator = new Calculator(previousHtml, currentHtml);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.appendInnerHtml();
    })
})

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendOperator(button.innerText);
        calculator.appendInnerHtml();
    })
})

equals.addEventListener('click', () => {
    calculator.equalHandler();

});
clearAll.addEventListener('click', () => {
    calculator.clear();
    calculator.appendInnerHtml();
});
minusButton.addEventListener('click', () => {
    calculator.minus();
    calculator.appendInnerHtml();
});

squareButton.addEventListener('click', () => {
    calculator.squareRoot();
});
