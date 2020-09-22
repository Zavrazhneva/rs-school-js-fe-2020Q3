const buttons = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const previousHtml = document.querySelector('.previous-operand');
const currentHtml = document.querySelector('.current-operand');
const clearAll = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');

class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = '';
    }

    appendNumber(number) {
        this.currentOperand += number.toString();
        this.appendInnerHtml(this.previousOperand, this.currentOperand)
    }

    setPreviousValue() {
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    appendOperator(operator) {
        this.operator = operator;
        this.setPreviousValue();
        this.appendInnerHtml(this.previousOperand + operator, this.currentOperand)
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = '';
        this.appendInnerHtml(this.previousOperand, this.currentOperand)
    }

    removeNumber() {
        this.currentOperand.slice(0, -1)
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
        }
        console.log(this.result)
    }

    equalHandler() {
        this.calculate();
        this.clear();
        this.appendInnerHtml(this.previousOperand, this.result)
    }

    appendInnerHtml(previous , current) {
        previousHtml.innerText = previous;
        currentHtml.innerText = current;
    }
}
let calculator = new Calculator(previousHtml, currentHtml);

buttons.forEach(button => {
    button.addEventListener('click', () => calculator.appendNumber(button.innerText))
})

operations.forEach(button => {
    button.addEventListener('click', () => calculator.appendOperator(button.innerText))
})

equals.addEventListener('click', () => calculator.equalHandler());
clearAll.addEventListener('click', () => calculator.clear());
deleteButton.addEventListener('click', () => calculator.removeNumber());
