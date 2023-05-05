//? class for calculator
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = null;
  }

  delete() {}

  appendNumber(number) {
    this.currentOperand = number;
  }

  chooseOperation() {}

  compute() {}

  updateDisplay() {
    this.currentOperandElement.textContent = this.currentOperand;
    this.previousOperandElement.textContent = this.previousOperand;
  }

  getDisplayNumber() {}
}

//? DOM elements
//output
const previousOperandElement = getElement("[data-previous-operand]", false);
const currentOperandElement = getElement("[data-current-operand]", false);
//buttons
const numberButtons = getElement("[data-number]");
const operationButtons = getElement("[data-operation]");
const equalsButton = getElement("[data-equals]", false);
const clearButton = getElement("[data-all-clear]", false);
const deleteButton = getElement("[data-delete]", false);

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);
//* events
numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.appendNumber(this.textContent);
    calculator.updateDisplay();
  });
});

//? utils
function getElement(element, all = true) {
  return all
    ? document.querySelectorAll(element)
    : document.querySelector(element);
}
