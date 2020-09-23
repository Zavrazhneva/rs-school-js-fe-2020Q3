const buttons = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const previousHtml = document.querySelector('.previous-operand');
const currentHtml = document.querySelector('.current-operand');
const clearAll = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const squareButton = document.querySelector('[data-square]');

class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = '';
        this.result = ''
    }

    appendNumber(number) {
        this.currentOperand += number.toString();
    }

    setPreviousValue() {
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    appendOperator(operator) {
        if (this.operator !== '') {
            this.calculate();
            this.previousOperand = this.result;
            this.appendInnerHtml();
        }
        this.operator = operator;
        this.setPreviousValue();
        console.log(operator);
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = '';
    }

    removeNumber() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate() {
        let current = parseFloat(this.currentOperand);
        let previous = parseFloat(this.previousOperand);


        switch (this.operator) {
            case '+' :
                this.result = previous + current;
                break;
            case '-' :
                this.result = previous - current;
                break;
            case '*' :
                this.result = previous * current;
                break;
            case '÷' :
                this.result = previous / current;
                break;
            case 'xy' :
                this.result = Math.pow(this.previousOperand, this.currentOperand)
                break;
        }
        this.appendInnerHtml();
    }

    squareRoot() {
        this.currentOperand  = Math.sqrt(this.currentOperand);
        this.appendInnerHtml();
    }

    equalHandler() {
        this.calculate();
        this.currentOperand = this.result;
        this.appendInnerHtml();
    }

    appendInnerHtml() {
        previousHtml.innerText = this.previousOperand;
        currentHtml.innerText = this.currentOperand;
        if (this.operation !== '') {
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
        calculator.appendInnerHtml()
    })
})

equals.addEventListener('click', () => {
    calculator.equalHandler();

});
clearAll.addEventListener('click', () => {
    calculator.clear();
    calculator.appendInnerHtml();
});
deleteButton.addEventListener('click', () => {
    calculator.removeNumber();
    calculator.appendInnerHtml();
});

squareButton.addEventListener('click', () => {
    calculator.squareRoot();
});
