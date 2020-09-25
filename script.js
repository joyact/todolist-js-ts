class Calculator {
  constructor(prevOperandElement, currOperandElement) {
    this.prevOperandElement = prevOperandElement;
    this.currOperandElement = currOperandElement;
    this.clear();
  }

  // remove all values from display
  clear() {
    this.prevOperand = '';
    this.currOperand = '';
    this.operation = undefined; // don't have any operation selected
  }

  // add the clicked number
  appendNumber(number) {
    //avoiding multiple dot('.')
    if (number === '.' && this.currOperand.includes('.')) return;
    this.currOperand += number;
    console.log(this.currOperand);
  }

  // change the value on display
  updateDisplay() {
    this.currOperandElement.innerText = this.currOperand;
  }
}

// select elements
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const acBtn = document.querySelector('[data-ac]');
const prevOperandElement = document.querySelector('.previous-operand');
const currOperandElement = document.querySelector('.current-operand');

const calculator = new Calculator(prevOperandElement, currOperandElement);

numberBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
