const buttons = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');

class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.readyResult = false;
        this.result = undefined;
        this.operator = ''
    }

    appendNumber(number) {
        if(this.previousOperand !== '') this.readyResult = true;
        this.currentOperand = this.currentOperand + number.toString();
    }

    appendOperator(operator) {
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    calculate() {
        let current = parseFloat(this.currentOperand);
        let previous = parseFloat(this.previousOperand);
        switch (this.operator) {
            case '+' :
                this.result =  previous + current;
                break;

            case '-' :
                this.result =  previous - current;
                break;

            case '*' :
                this.result =  previous * current;
                break;

            case '÷' :
                this.result =  previous / current;
                break;
        }
        console.log(this.result)
    }
    equally() {
        if (this.readyResult) {
            this.calculate()
        }
    }

}

let calculator = new Calculator();

buttons.forEach( button => {
    button.addEventListener('click', () => calculator.appendNumber(button.innerText))
})

operations.forEach( button => {
    button.addEventListener('click', () => calculator.appendOperator(button.innerText))
})

equals.addEventListener('click', () => calculator.equally());