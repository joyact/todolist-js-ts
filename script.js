class Calculator {
  constructor(prevOperandElement, currOperandElement) {
    this.prevOperandElement = prevOperandElement;
    this.currOperandElement = currOperandElement;
    this.clear();
  }

  // initial display on load
  clear() {
    // declare 3 methods
    this.prevOperand = '';
    this.currOperand = '';
    this.operation = undefined; // don't have any operation selected
  }

  // add the clicked number
  appendNumber(number) {
    //avoiding multiple dot('.')
    if (number === '.' && this.currOperand.includes('.')) return;
    this.currOperand += number;
  }

  // move numbers to the previous area
  chooseOperation(operation) {
    if (this.currOperand === '') return;
    if (this.prevOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  compute() {
    let computation; //result of this function
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = '';
  }

  // make the clicked value printed
  updateDisplay() {
    this.currOperandElement.innerText = this.currOperand;
    this.prevOperandElement.innerText = this.prevOperand;
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

//when number buttons clicked
numberBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//when operation buttons clicked
operationBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});
