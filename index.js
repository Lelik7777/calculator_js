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

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number;
  }

  chooseOperation(operation) {
    if (!this.currentOperand) return;
    if (this.operation) {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    console.log(this.operation);
  }

  compute() {
    let result;
    const currentNumber = Number.parseFloat(this.currentOperand);
    const previousNumber = Number.parseFloat(this.previousOperand);
    //check currentNumber and previousNumber are numbers or not;
    if (isNaN(currentNumber) || isNaN(previousNumber)) return;
    switch (this.operation) {
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "-":
        result = previousNumber - currentNumber;
        break;
      case "*":
        result = previousNumber * currentNumber;
        break;
      case "÷":
        result = previousNumber / currentNumber;
        break;
      default:
        //! if not comparing with operation then return
        return;
    }
    this.operation = null;
    this.currentOperand = result;
    this.previousOperand = "";
    console.log(this.operation);
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation) {
      this.previousOperandElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandElement.textContent = "";
    }
  }

  getDisplayNumber(number) {
    //for toLocalString number must be float;
    const integerNumber = Number.parseFloat(String(number).split(".")[0]);
    const decimalNumber = number.toString().split(".")[1];
    let displayInteger;
    if (isNaN(integerNumber)) {
      displayInteger = "";
    } else {
      displayInteger = integerNumber.toLocaleString("ru");
    }
    if (decimalNumber) {
      return `${displayInteger}.${decimalNumber}`;
    } else {
      return displayInteger;
    }
  }
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
operationButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.chooseOperation(this.textContent);
    calculator.updateDisplay();
  });
});
clearButton.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});
equalsButton.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
});

//? utils
function getElement(element, all = true) {
  return all
    ? document.querySelectorAll(element)
    : document.querySelector(element);
}
