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

  // remove the last added number
  delete() {
    this.currOperand = this.currOperand.slice(0, -1);
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

  // compute the number
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

  // handle the decimal place
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]); // before the period(.)
    const decimalDigits = stringNumber.split('.')[1]; // after the period(.)
    let integerDisplay;

    // add thousand delimiter (,)
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0, // zero decimal place
      });
    }

    // add decimal point (.)
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  // make the clicked value printed
  updateDisplay() {
    this.currOperandElement.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operation != null) {
      this.prevOperandElement.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      this.prevOperandElement.innerText = '';
    }
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

//when number buttons are clicked
numberBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

//when operation buttons are clicked
operationBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

//when '=' is clicked
equalsBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

//when 'AC' is clicked
acBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

//when 'DEL' is clicked
deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
